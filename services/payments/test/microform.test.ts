import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { signRequest } from '../src/adapters/cybersource/http-signature.js';
import { signRs256 } from '../src/adapters/cybersource/jwt.js';
import { decimalToMinor, minorToDecimal } from '../src/adapters/cybersource/money.js';
import { authorizeWithTransientToken, createCaptureContext, type CyberSourceCredentials } from '../src/adapters/cybersource/microform.js';

const creds: CyberSourceCredentials = {
  merchantId: 'merchant_1',
  keyId: 'key_1',
  sharedSecret: Buffer.from('test-secret').toString('base64'),
  targetOrigins: ['https://thehardport.com'],
  allowedCardNetworks: ['VISA', 'MASTERCARD'],
};

function rsa() {
  return crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
}

function jwk(key: crypto.KeyObject, kid: string): Record<string, unknown> {
  return { ...key.export({ format: 'jwk' }), kid, use: 'enc', alg: 'RS256' };
}

test('minor units format without floating point', () => {
  assert.equal(minorToDecimal(10000, 'USD'), '100.00');
  assert.equal(minorToDecimal(1, 'USD'), '0.01');
  assert.equal(minorToDecimal(0, 'EUR'), '0.00');
  assert.equal(minorToDecimal(100, 'JPY'), '100');
  assert.equal(decimalToMinor('100.00', 'USD'), 10000);
  assert.equal(decimalToMinor('0.10', 'USD'), 10);
  assert.throws(() => minorToDecimal(100, 'XXX'));
});

test('HTTP signature covers the body and uses the decoded shared secret', () => {
  const body = '{"clientVersion":"v2"}';
  const headers = signRequest({
    merchantId: creds.merchantId,
    keyId: creds.keyId,
    sharedSecret: creds.sharedSecret,
    host: 'apitest.cybersource.com',
    method: 'POST',
    path: '/microform/v2/sessions',
    body,
    date: 'Sat, 17 Oct 2026 12:00:00 GMT',
  });
  const signing = [
    'host: apitest.cybersource.com',
    'date: Sat, 17 Oct 2026 12:00:00 GMT',
    '(request-target): post /microform/v2/sessions',
    `digest: ${headers.digest}`,
    'v-c-merchant-id: merchant_1',
  ].join('\n');
  const expected = crypto.createHmac('sha256', Buffer.from('test-secret')).update(signing).digest('base64');
  assert.equal(headers.signature, `keyid="key_1", algorithm="HmacSHA256", headers="host date (request-target) digest v-c-merchant-id", signature="${expected}"`);
  const other = signRequest({ ...{
    merchantId: creds.merchantId, keyId: creds.keyId, sharedSecret: creds.sharedSecret,
    host: 'apitest.cybersource.com', method: 'POST', path: '/microform/v2/sessions', date: headers.date,
  }, body: '{"clientVersion":"v1"}' });
  assert.notEqual(other.signature, headers.signature);
});

test('capture context is verified and a bad transient token never reaches the payment call', async () => {
  const signer = rsa();
  const flex = rsa();
  const flexJwk = jwk(flex.publicKey, 'flex-kid');
  const now = new Date('2026-10-17T12:00:00Z');
  const capture = signRs256({
    flx: { jwk: flexJwk },
    ctx: [{
      data: {
        clientLibrary: 'https://testflex.cybersource.com/microform/bundle/v2/flex-microform.min.js',
        clientLibraryIntegrity: 'sha256-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa=',
        targetOrigins: ['https://thehardport.com'],
        allowedCardNetworks: ['VISA'],
      },
      type: 'mf-2.0.0',
    }],
    exp: Math.floor(now.getTime() / 1000) + 900,
    iat: Math.floor(now.getTime() / 1000),
  }, signer.privateKey, { kid: 'cs-kid' });

  const calls: string[] = [];
  const fetchImpl: typeof fetch = async (url) => {
    const href = String(url);
    calls.push(href);
    if (href.endsWith('/microform/v2/sessions')) return new Response(capture, { status: 201 });
    if (href.endsWith('/flex/v2/public-keys/cs-kid')) return new Response(JSON.stringify(jwk(signer.publicKey, 'cs-kid')), { status: 200 });
    return new Response('no', { status: 500 });
  };

  const session = await createCaptureContext(creds, 'test', { fetch: fetchImpl, now: () => now });
  assert.equal(session.captureContext, capture);
  assert.equal(session.clientLibrary, 'https://testflex.cybersource.com/microform/bundle/v2/flex-microform.min.js');

  const token = signRs256({ exp: Math.floor(now.getTime() / 1000) + 60 }, flex.privateKey, { kid: 'flex-kid' });
  await assert.rejects(
    () => authorizeWithTransientToken({
      creds, mode: 'test', orderId: '11111111-1111-4111-8111-111111111111', totalMinor: 10000, currency: 'USD',
      customerEmail: 'buyer@client.test', transientToken: token + 'x', captureContext: capture,
    }, { fetch: fetchImpl, now: () => now }),
    /bad_transient_token/,
  );
  assert.equal(calls.some((url) => url.includes('/pts/v2/payments')), false);

  let charged = '';
  const payFetch: typeof fetch = async (url, init) => {
    charged = String(init?.body);
    return new Response(JSON.stringify({
      id: 'pay_1',
      status: 'AUTHORIZED',
      orderInformation: { amountDetails: { authorizedAmount: '100.00', currency: 'usd' } },
    }), { status: 201 });
  };
  const paid = await authorizeWithTransientToken({
    creds, mode: 'test', orderId: '11111111-1111-4111-8111-111111111111', totalMinor: 10000, currency: 'USD',
    customerEmail: 'buyer@client.test', transientToken: token, captureContext: capture,
  }, { fetch: payFetch, now: () => now });
  assert.equal(paid.decision, 'ACCEPT');
  assert.equal(paid.amountMinor, 10000);
  assert.equal(paid.currency, 'USD');
  assert.match(charged, /"transientTokenJwt":/);
  assert.match(charged, /"totalAmount":"100.00"/);
  assert.doesNotMatch(charged, /411111/);
});
