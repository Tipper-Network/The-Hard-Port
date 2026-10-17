import crypto from 'node:crypto';

export interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
}

/** Encodes bytes as base64url with no padding, the form JWT segments use. */
function b64url(buf: Buffer): string {
  return buf.toString('base64url');
}

/** Decodes a base64url JWT segment. */
function b64urlDecode(s: string): Buffer {
  return Buffer.from(s, 'base64url');
}

/**
 * Signs a JWT with RS256. Tests use this to imitate CyberSource. Production code only verifies.
 * @param payload - Claims, including `exp` in seconds
 * @param key - RSA private key
 * @param header - Extra header fields, usually `kid`
 */
export function signRs256(payload: Record<string, unknown>, key: crypto.KeyObject, header: Record<string, unknown> = {}): string {
  const h = b64url(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', ...header })));
  const p = b64url(Buffer.from(JSON.stringify(payload)));
  const data = Buffer.from(`${h}.${p}`);
  const sig = crypto.sign('sha256', data, key);
  return `${h}.${p}.${b64url(sig)}`;
}

/**
 * Splits a JWT without trusting it. Call `verifyRs256` before using the payload.
 * @param token - Three base64url segments
 * @throws Error `malformed_jwt` when the shape or JSON is wrong
 */
export function readJwt(token: string): JwtParts & { signingInput: string; signature: Buffer } {
  const parts = token.split('.');
  if (parts.length !== 3 || parts.some((p) => p.length === 0)) throw new Error('malformed_jwt');
  const [h, p, s] = parts as [string, string, string];
  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = JSON.parse(b64urlDecode(h).toString('utf8')) as Record<string, unknown>;
    payload = JSON.parse(b64urlDecode(p).toString('utf8')) as Record<string, unknown>;
  } catch {
    throw new Error('malformed_jwt');
  }
  return { header, payload, signingInput: `${h}.${p}`, signature: b64urlDecode(s) };
}

/**
 * Imports an RSA JWK as a verify key. `use: enc` is stripped because CyberSource labels the Microform key that way and still signs with it.
 * @param jwk - Public JWK with `kty`, `n`, and `e`
 */
export function publicKeyFromJwk(jwk: Record<string, unknown>): crypto.KeyObject {
  if (jwk.kty !== 'RSA' || typeof jwk.n !== 'string' || typeof jwk.e !== 'string') throw new Error('unsupported_jwk');
  const { use: _use, key_ops: _ops, ...rest } = jwk;
  return crypto.createPublicKey({ key: rest as crypto.JsonWebKey, format: 'jwk' });
}

/**
 * Verifies an RS256 signature and rejects an expired token.
 * @param token - JWT to check
 * @param key - Public key that should have signed it
 * @param nowMs - Clock used for `exp`
 * @returns The payload when the signature and expiry hold
 * @throws Error `unexpected_alg`, `bad_signature`, or `expired`
 */
export function verifyRs256(token: string, key: crypto.KeyObject, nowMs = Date.now()): Record<string, unknown> {
  const jwt = readJwt(token);
  if (jwt.header.alg !== 'RS256') throw new Error('unexpected_alg');
  const ok = crypto.verify('sha256', Buffer.from(jwt.signingInput), key, jwt.signature);
  if (!ok) throw new Error('bad_signature');
  const exp = jwt.payload.exp;
  if (typeof exp !== 'number' || exp * 1000 <= nowMs) throw new Error('expired');
  return jwt.payload;
}
