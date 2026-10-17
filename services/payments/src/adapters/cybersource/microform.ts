// CyberSource Microform v2 client. The route layer and the external call sequence are in
// docs/platform-routes.md. This file only talks to CyberSource: capture context, token check, charge.

import crypto from 'node:crypto';
import { z } from 'zod';
import { publicKeyFromJwk, readJwt, verifyRs256 } from './jwt.js';
import { signRequest } from './http-signature.js';
import { decimalToMinor, minorToDecimal } from './money.js';

/** CyberSource call failed before an order should be marked paid. `reason` is a stable code, not a provider body. */
export class GatewayCallError extends Error {
  /**
   * @param reason - Stable code such as `bad_transient_token`, `checkout_expired`, or `gateway_rejected`
   */
  constructor(readonly reason: string) {
    super(reason);
    this.name = 'GatewayCallError';
  }
}

const CARD_NETWORKS = [
  'VISA', 'MASTERCARD', 'AMEX', 'MAESTRO', 'DISCOVER', 'DINERSCLUB', 'JCB', 'CUP', 'CARTESBANCAIRES',
] as const;

const LIBRARY_HOSTS = new Set(['flex.cybersource.com', 'testflex.cybersource.com', 'stageflex.cybersource.com']);

const Origin = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.origin === value;
  } catch {
    return false;
  }
}, 'https origin');

export const CyberSourceCredentials = z
  .object({
    merchantId: z.string().min(1).max(50),
    keyId: z.string().min(1).max(100),
    sharedSecret: z.string().min(1).max(200),
    targetOrigins: z.array(Origin).min(1).max(10),
    allowedCardNetworks: z.array(z.enum(CARD_NETWORKS)).min(1).max(12).default(['VISA', 'MASTERCARD']),
  })
  .strict();

export type CyberSourceCredentials = z.infer<typeof CyberSourceCredentials>;

const CaptureContext = z.object({
  flx: z.object({
    jwk: z.object({ kty: z.literal('RSA'), n: z.string().min(1), e: z.string().min(1), kid: z.string().min(1) }).passthrough(),
  }),
  ctx: z.array(z.object({
    data: z.object({
      clientLibrary: z.string().url(),
      clientLibraryIntegrity: z.string().regex(/^sha(256|384|512)-[A-Za-z0-9+/=]+$/),
      targetOrigins: z.array(z.string()),
    }),
  })).min(1),
  exp: z.number(),
});

export interface CaptureContextResult {
  captureContext: string;
  clientLibrary: string;
  clientLibraryIntegrity: string;
}

export interface AuthorizeResult {
  decision: 'ACCEPT' | 'DECLINE' | 'REVIEW';
  transactionId: string;
  providerEventId: string;
  amountMinor: number | null;
  currency: string | null;
  payload: unknown;
}

export interface CyberSourceDeps {
  fetch?: typeof fetch;
  now?: () => Date;
}

/**
 * CyberSource REST host for the gateway account mode.
 * @param mode - `test` uses the sandbox host
 */
export function apiHost(mode: 'test' | 'live'): string {
  return mode === 'live' ? 'api.cybersource.com' : 'apitest.cybersource.com';
}

/**
 * Key id from a capture-context JWT header. Used to fetch CyberSource's public key.
 * @param token - Capture-context JWT
 * @throws {GatewayCallError} when the header has no safe `kid`
 */
function kid(token: string): string {
  const headerKid = readJwt(token).header.kid;
  if (typeof headerKid !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(headerKid)) throw new GatewayCallError('bad_capture_context');
  return headerKid;
}

/**
 * POST signed with the tenant's HTTP Signature credentials. Does not log the body.
 * @param deps - Clock and fetch implementation
 * @param creds - Merchant id, key id, and shared secret
 * @param mode - Selects the sandbox or live host
 * @param path - Path beginning with `/`, included in the signature
 * @param body - JSON-serialised request
 * @throws {GatewayCallError} `gateway_unreachable` when the connection fails
 */
async function signedPost(deps: Required<Pick<CyberSourceDeps, 'fetch' | 'now'>>, creds: CyberSourceCredentials, mode: 'test' | 'live', path: string, body: unknown): Promise<{ status: number; text: string }> {
  const host = apiHost(mode);
  const raw = JSON.stringify(body);
  const headers = signRequest({
    merchantId: creds.merchantId,
    keyId: creds.keyId,
    sharedSecret: creds.sharedSecret,
    host,
    method: 'POST',
    path,
    body: raw,
    date: deps.now().toUTCString(),
  });
  let res: Response;
  try {
    res = await deps.fetch(`https://${host}${path}`, { method: 'POST', headers, body: raw });
  } catch {
    throw new GatewayCallError('gateway_unreachable');
  }
  return { status: res.status, text: await res.text() };
}

/**
 * Pulls the capture-context JWT out of a raw or JSON-wrapped response body.
 * @param text - Response body from `POST /microform/v2/sessions`
 * @throws {GatewayCallError} `capture_context_missing` when no JWT is present
 */
function readCaptureJwt(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith('eyJ')) return trimmed;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (typeof parsed === 'string') return parsed;
  } catch {
    /* not json */
  }
  throw new GatewayCallError('capture_context_missing');
}

/**
 * Creates a Microform v2 capture context and verifies CyberSource signed it.
 * The returned JWT is what the browser passes to `Flex`. `targetOrigins` come from `creds`, never from the request.
 *
 * @param creds - Tenant CyberSource credentials, including allowed origins and card networks
 * @param mode - `test` or `live`
 * @param deps - Optional fetch and clock, used by tests
 * @returns Capture context plus the Flex script URL and its integrity hash
 * @throws {GatewayCallError} when CyberSource rejects the call or the JWT does not verify
 */
export async function createCaptureContext(creds: CyberSourceCredentials, mode: 'test' | 'live', deps: CyberSourceDeps = {}): Promise<CaptureContextResult> {
  const fetchImpl = deps.fetch ?? fetch;
  const now = deps.now ?? (() => new Date());
  const { status, text } = await signedPost({ fetch: fetchImpl, now }, creds, mode, '/microform/v2/sessions', {
    clientVersion: 'v2',
    targetOrigins: creds.targetOrigins,
    allowedCardNetworks: creds.allowedCardNetworks,
    allowedPaymentTypes: ['CARD'],
  });
  if (status < 200 || status >= 300) throw new GatewayCallError('capture_context_rejected');
  const token = readCaptureJwt(text);
  const keyId = kid(token);

  let keyRes: Response;
  try {
    keyRes = await fetchImpl(`https://${apiHost(mode)}/flex/v2/public-keys/${keyId}`);
  } catch {
    throw new GatewayCallError('gateway_unreachable');
  }
  if (!keyRes.ok) throw new GatewayCallError('capture_context_unverified');
  let jwk: Record<string, unknown>;
  try {
    jwk = (await keyRes.json()) as Record<string, unknown>;
  } catch {
    throw new GatewayCallError('capture_context_unverified');
  }
  let payload: Record<string, unknown>;
  try {
    payload = verifyRs256(token, publicKeyFromJwk(jwk), now().getTime());
  } catch {
    throw new GatewayCallError('capture_context_unverified');
  }
  const parsed = CaptureContext.safeParse(payload);
  if (!parsed.success) throw new GatewayCallError('capture_context_unverified');
  const data = parsed.data.ctx[0]!.data;
  let library: URL;
  try {
    library = new URL(data.clientLibrary);
  } catch {
    throw new GatewayCallError('capture_context_unverified');
  }
  if (library.protocol !== 'https:' || !LIBRARY_HOSTS.has(library.host)) throw new GatewayCallError('capture_context_unverified');
  const wanted = new Set(creds.targetOrigins);
  if (data.targetOrigins.length !== wanted.size || data.targetOrigins.some((origin) => !wanted.has(origin))) {
    throw new GatewayCallError('capture_context_unverified');
  }
  return { captureContext: token, clientLibrary: data.clientLibrary, clientLibraryIntegrity: data.clientLibraryIntegrity };
}

/**
 * Checks that `microform.createToken()` produced this token for this capture context.
 * The public key is `flx.jwk` inside the capture context. A bad or expired token never reaches `/pts/v2/payments`.
 *
 * @param captureContext - JWT stored on the order when checkout started
 * @param transientToken - JWT the browser posted back
 * @param nowMs - Clock used for expiry, injectable in tests
 * @throws {GatewayCallError} `bad_transient_token`, `checkout_expired`, or `checkout_not_started`
 */
export function verifyTransientToken(captureContext: string, transientToken: string, nowMs = Date.now()): void {
  const context = CaptureContext.safeParse(readJwt(captureContext).payload);
  if (!context.success) throw new GatewayCallError('checkout_not_started');
  const contextExp = context.data.exp;
  if (contextExp * 1000 <= nowMs) throw new GatewayCallError('checkout_expired');
  const jwk = context.data.flx.jwk;
  let tokenHeaderKid: unknown;
  try {
    tokenHeaderKid = readJwt(transientToken).header.kid;
    verifyRs256(transientToken, publicKeyFromJwk(jwk), nowMs);
  } catch (err) {
    if (err instanceof GatewayCallError) throw err;
    throw new GatewayCallError('bad_transient_token');
  }
  if (tokenHeaderKid !== jwk.kid) throw new GatewayCallError('bad_transient_token');
}

/**
 * Maps a CyberSource payment `status` onto the decision this service stores.
 * Only `AUTHORIZED` becomes a paid order. Anything else is a decline or a review.
 * @param status - `payload.status` from `POST /pts/v2/payments`
 */
function decisionFromStatus(status: string | undefined): 'ACCEPT' | 'DECLINE' | 'REVIEW' {
  if (status === 'AUTHORIZED') return 'ACCEPT';
  if (status === 'DECLINED' || status === 'INVALID_REQUEST' || status === 'AUTHORIZED_RISK_DECLINED') return 'DECLINE';
  return 'REVIEW';
}

/**
 * Verifies the transient token, then charges it with `POST /pts/v2/payments`.
 * The amount sent is the order total. CyberSource uses that amount over anything inside the token.
 * `capture: true` asks for a sale. The caller must still compare `amountMinor` to the order before marking it paid.
 *
 * @param input - Order, customer email, transient token, and the capture context that issued it
 * @param deps - Optional fetch and clock
 * @returns Decision, transaction id, and the authorized amount when CyberSource echoed one
 * @throws {GatewayCallError} for a bad token, an unsupported currency, or a gateway failure. A parsed decline is returned, not thrown.
 */
export async function authorizeWithTransientToken(input: {
  creds: CyberSourceCredentials;
  mode: 'test' | 'live';
  orderId: string;
  totalMinor: number;
  currency: string;
  customerEmail: string;
  transientToken: string;
  captureContext: string;
}, deps: CyberSourceDeps = {}): Promise<AuthorizeResult> {
  const now = deps.now ?? (() => new Date());
  verifyTransientToken(input.captureContext, input.transientToken, now().getTime());
  const currency = input.currency.toUpperCase();
  let totalAmount: string;
  try {
    totalAmount = minorToDecimal(input.totalMinor, currency);
  } catch {
    throw new GatewayCallError('unsupported_currency');
  }
  const { status, text } = await signedPost(
    { fetch: deps.fetch ?? fetch, now },
    input.creds,
    input.mode,
    '/pts/v2/payments',
    {
      clientReferenceInformation: { code: input.orderId },
      processingInformation: { capture: true, commerceIndicator: 'internet' },
      orderInformation: {
        amountDetails: { totalAmount, currency },
        billTo: { email: input.customerEmail },
      },
      tokenInformation: { transientTokenJwt: input.transientToken },
    },
  );
  if (status >= 500 || status === 0) throw new GatewayCallError('gateway_unavailable');
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new GatewayCallError('gateway_unavailable');
  }
  const id = typeof payload.id === 'string' ? payload.id : '';
  const paymentStatus = typeof payload.status === 'string' ? payload.status : undefined;
  const amountDetails = (payload.orderInformation as { amountDetails?: { authorizedAmount?: unknown; currency?: unknown } } | undefined)?.amountDetails;
  let amountMinor: number | null = null;
  let responseCurrency: string | null = null;
  if (typeof amountDetails?.authorizedAmount === 'string' && typeof amountDetails.currency === 'string') {
    try {
      amountMinor = decimalToMinor(amountDetails.authorizedAmount, amountDetails.currency);
      responseCurrency = amountDetails.currency.toUpperCase();
    } catch {
      amountMinor = null;
    }
  }
  if (status >= 400 && !paymentStatus) throw new GatewayCallError('gateway_rejected');
  return {
    decision: decisionFromStatus(paymentStatus),
    transactionId: id,
    providerEventId: id || `${decisionFromStatus(paymentStatus)}:${input.orderId}:${crypto.randomUUID()}`,
    amountMinor,
    currency: responseCurrency,
    payload,
  };
}
