import crypto from 'node:crypto';

export interface SignedHeaders extends Record<string, string> {
  host: string;
  date: string;
  digest: string;
  'v-c-merchant-id': string;
  signature: string;
  'content-type': string;
}

/**
 * Builds the CyberSource HTTP Signature headers for one request.
 * The shared secret is stored base64-encoded and decoded before the HMAC.
 * The signed string is host, date, request-target, digest, and v-c-merchant-id, joined by LF.
 *
 * @param input - Merchant id, key id, secret, host, method, path, raw body, and Date header value
 * @returns Headers to send, including `signature` and `digest`
 */
export function signRequest(input: {
  merchantId: string;
  keyId: string;
  sharedSecret: string;
  host: string;
  method: string;
  path: string;
  body: string;
  date: string;
}): SignedHeaders {
  const digest = `SHA-256=${crypto.createHash('sha256').update(input.body, 'utf8').digest('base64')}`;
  const signing = [
    `host: ${input.host}`,
    `date: ${input.date}`,
    `(request-target): ${input.method.toLowerCase()} ${input.path}`,
    `digest: ${digest}`,
    `v-c-merchant-id: ${input.merchantId}`,
  ].join('\n');
  const key = Buffer.from(input.sharedSecret, 'base64');
  const signature = crypto.createHmac('sha256', key).update(signing).digest('base64');
  return {
    host: input.host,
    date: input.date,
    digest,
    'v-c-merchant-id': input.merchantId,
    signature: `keyid="${input.keyId}", algorithm="HmacSHA256", headers="host date (request-target) digest v-c-merchant-id", signature="${signature}"`,
    'content-type': 'application/json',
  };
}
