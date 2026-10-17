import { z } from 'zod';
import { hmacHex, safeEqual } from '@hardport/core';
import { authorizeWithTransientToken, createCaptureContext, CyberSourceCredentials, GatewayCallError } from './cybersource/microform.js';

// Every payment provider sits behind this interface. Card data never reaches this service.
// CyberSource Microform v2 mounts hosted iframes on the tenant's own page. The server creates
// a capture context, the browser returns a transient token, and this service charges that token.
// The fake gateway still uses a signed notification so the paid/commission/outbox path stays tested.

export interface GatewayEvent {
  providerEventId: string;
  orderId: string;
  decision: 'ACCEPT' | 'DECLINE' | 'REFUND';
  amountMinor: number;
  currency: string;
  transactionId: string;
  payload: unknown;
}

export type VerifyOutcome = { ok: true; event: GatewayEvent } | { ok: false; reason: string };

export interface CheckoutInput {
  orderId: string;
  tenantId: string;
  totalMinor: number;
  currency: string;
  customerEmail: string;
  itemTitle: string;
  mode: 'test' | 'live';
}

export type Credentials = Record<string, unknown>;
type Headers = Record<string, string | string[] | undefined>;

export type CheckoutSession =
  | { mode: 'redirect'; redirectUrl: string }
  | { mode: 'microform'; captureContext: string; clientLibrary: string; clientLibraryIntegrity: string };

export interface PayInput {
  orderId: string;
  totalMinor: number;
  currency: string;
  customerEmail: string;
  transientToken: string;
  captureContext: string;
  mode: 'test' | 'live';
}

export interface PayOutcome {
  decision: 'ACCEPT' | 'DECLINE' | 'REVIEW';
  transactionId: string;
  providerEventId: string;
  amountMinor: number | null;
  currency: string | null;
  payload: unknown;
}

/**
 * One payment provider. Card data never reaches this process.
 * External call sequence: docs/platform-routes.md.
 */
export interface GatewayAdapter {
  readonly provider: 'cybersource' | 'fake';
  /**
   * Starts a checkout for an order whose price was already stored.
   * Fake returns a redirect URL. CyberSource returns a Microform capture context.
   *
   * @param credentials - That tenant's decrypted gateway credentials
   * @param input - Order id, amount, currency, and test or live mode
   */
  createCheckout(credentials: Credentials, input: CheckoutInput): Promise<CheckoutSession>;
  /**
   * Authenticates a provider notification and parses it. Returns `ok: false` for anything that cannot be verified.
   *
   * @param credentials - That tenant's decrypted gateway credentials
   * @param rawBody - Exact request bytes
   * @param headers - Request headers, including the provider signature
   */
  verifyNotification(credentials: Credentials, rawBody: string, headers: Headers): VerifyOutcome;
  /**
   * Charges a Microform transient token. Redirect-style gateways omit this.
   *
   * @param credentials - That tenant's decrypted gateway credentials
   * @param input - Order amount plus the transient token and the capture context that issued it
   */
  completePayment?(credentials: Credentials, input: PayInput): Promise<PayOutcome>;
}

// ---------------------------------------------------------------------------------------
// Fake gateway: for development and tests. Signs the raw body with a shared secret.
// ---------------------------------------------------------------------------------------

const FakeNotification = z.object({
  eventId: z.string().min(1).max(100),
  orderId: z.string().uuid(),
  decision: z.enum(['ACCEPT', 'DECLINE', 'REFUND']),
  amountMinor: z.number().int().min(0),
  currency: z.string().length(3),
  transactionId: z.string().min(1).max(100),
});

export const fakeGateway: GatewayAdapter = {
  provider: 'fake',
  /** Returns a fake redirect URL. No provider is contacted. */
  async createCheckout(_creds, input) {
    return { mode: 'redirect', redirectUrl: `https://fake-gateway.invalid/pay/${input.orderId}` };
  },
  /**
   * Checks `x-fake-signature` as HMAC-SHA256 of the raw body, using `credentials.secret`.
   * @param creds - Must contain a string `secret`
   * @param rawBody - Exact notification body
   * @param headers - Must contain `x-fake-signature`
   */
  verifyNotification(creds, rawBody, headers) {
    const secret = creds.secret;
    if (typeof secret !== 'string') return { ok: false, reason: 'missing_signature' };
    const sig = headers['x-fake-signature'];
    if (typeof sig !== 'string') return { ok: false, reason: 'missing_signature' };
    if (!safeEqual(hmacHex(secret, rawBody), sig)) return { ok: false, reason: 'bad_signature' };
    let json: unknown;
    try {
      json = JSON.parse(rawBody);
    } catch {
      return { ok: false, reason: 'invalid_json' };
    }
    const parsed = FakeNotification.safeParse(json);
    if (!parsed.success) return { ok: false, reason: 'invalid_payload' };
    const n = parsed.data;
    return {
      ok: true,
      event: { providerEventId: n.eventId, orderId: n.orderId, decision: n.decision, amountMinor: n.amountMinor, currency: n.currency, transactionId: n.transactionId, payload: json },
    };
  },
};

// CyberSource Microform v2. Refunds and chargebacks still arrive later; this adapter does not
// trust an unsigned browser return. verifyNotification stays closed until the bank's webhook
// signing rules are confirmed. Sale result comes from POST /pts/v2/payments.

/**
 * Parses the decrypted credential JSON for a CyberSource account.
 * @param credentials - Object stored encrypted on `payments.gateway_accounts`
 * @throws {GatewayCallError} `invalid_gateway_credentials` when a required field is missing
 */
function parseCyberSource(credentials: Credentials): CyberSourceCredentials {
  const parsed = CyberSourceCredentials.safeParse(credentials);
  if (!parsed.success) throw new GatewayCallError('invalid_gateway_credentials');
  return parsed.data;
}

export const cybersourceGateway: GatewayAdapter = {
  provider: 'cybersource',
  /** Asks CyberSource for a Microform capture context. The browser never sends a card number here. */
  async createCheckout(credentials, input) {
    const session = await createCaptureContext(parseCyberSource(credentials), input.mode);
    return { mode: 'microform', ...session };
  },
  /** Always rejects. CyberSource webhook signing is not configured yet. */
  verifyNotification() {
    return { ok: false, reason: 'webhook_not_configured' };
  },
  /** Verifies the transient token against this order's capture context, then posts the sale. */
  async completePayment(credentials, input) {
    return authorizeWithTransientToken({
      creds: parseCyberSource(credentials),
      mode: input.mode,
      orderId: input.orderId,
      totalMinor: input.totalMinor,
      currency: input.currency,
      customerEmail: input.customerEmail,
      transientToken: input.transientToken,
      captureContext: input.captureContext,
    });
  },
};

/**
 * Returns the adapter for a stored `provider` value, or null when the name is unknown.
 * @param provider - `cybersource` or `fake`
 */
export function getAdapter(provider: string): GatewayAdapter | null {
  if (provider === 'fake') return fakeGateway;
  if (provider === 'cybersource') return cybersourceGateway;
  return null;
}
