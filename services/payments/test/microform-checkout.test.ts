import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { Db, createPool, encryptField, signRequest, type Keyring } from '@hardport/core';
import { GatewayCallError } from '../src/adapters/cybersource/microform.js';
import type { GatewayAdapter, PayOutcome } from '../src/adapters/gateway.js';
import { buildApp } from '../src/app.js';
import type { PaymentsConfig } from '../src/config.js';
import { createTestDb, seedTenant, type TestDb } from '../../../test-support/db.js';

const ring: Keyring = { current: 'k1', keys: { k1: Buffer.alloc(32, 5) } };
const INTERNAL = { current: 'k1', keys: { k1: 'i'.repeat(40) } };
const config: PaymentsConfig = {
  host: '127.0.0.1', port: 0, adminOrigins: ['https://admin.test'], cookieSecure: false, trustProxy: false,
  fieldKeys: ring, internalKeys: INTERNAL, accessInternalUrl: 'http://unused.invalid', commissionHoldDays: 30,
};

let t: TestDb;
let db: Db;
let tenant = '';
let calls = 0;
let outcome: PayOutcome | Error = {
  decision: 'ACCEPT', transactionId: 'tx-1', providerEventId: 'evt-1', amountMinor: 10000, currency: 'USD', payload: { status: 'AUTHORIZED' },
};

const adapter: GatewayAdapter = {
  provider: 'cybersource',
  async createCheckout() {
    return {
      mode: 'microform',
      captureContext: 'capture-context',
      clientLibrary: 'https://testflex.cybersource.com/microform/bundle/v2/flex-microform.min.js',
      clientLibraryIntegrity: 'sha256-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa=',
    };
  },
  verifyNotification() {
    return { ok: false, reason: 'webhook_not_configured' };
  },
  async completePayment() {
    calls += 1;
    if (outcome instanceof Error) throw outcome;
    return outcome;
  },
};

async function signed(url: string, payload: unknown) {
  const body = JSON.stringify(payload);
  const app = await buildApp({ db, config, adapters: { cybersource: adapter } });
  const res = await app.inject({
    method: 'POST', url,
    headers: { 'content-type': 'application/json', 'x-hp-signature': signRequest({ keys: INTERNAL, method: 'POST', path: url, body }) },
    payload: body,
  });
  await app.close();
  return res;
}

before(async () => {
  t = await createTestDb();
  db = new Db(createPool(t.url, 4), { testRole: 'hp_payments' });
  tenant = await seedTenant(t.seed, 'alpha');
  const enc = encryptField(JSON.stringify({
    merchantId: 'm1', keyId: 'k', sharedSecret: Buffer.from('s').toString('base64'), targetOrigins: ['https://thehardport.com'],
  }), ring, `gw:${tenant}:cybersource:test`);
  await t.seed.query(
    `INSERT INTO payments.gateway_accounts (tenant_id, provider, mode, merchant_id, credentials_enc) VALUES ($1, 'cybersource', 'test', 'm1', $2)`,
    [tenant, enc],
  );
});

after(async () => {
  await db.close();
  await t.drop();
});

test('microform checkout returns a capture context and complete marks the order paid once', async () => {
  const created = await signed('/internal/checkout-sessions', {
    tenantId: tenant, externalRef: 'cart-1', customerEmail: 'buyer@client.test',
    item: { ref: 'roadmap-kit', title: 'Roadmap kit', listPriceMinor: 12000, currency: 'USD' }, discountMinor: 2000,
  });
  assert.equal(created.statusCode, 200, created.body);
  assert.equal(created.json().captureContext, 'capture-context');
  assert.equal(created.json().redirectUrl, undefined);
  const orderId = created.json().orderId as string;

  const paid = await signed('/internal/checkout-sessions/complete', { tenantId: tenant, orderId, transientToken: 'tok' });
  assert.equal(paid.statusCode, 200, paid.body);
  assert.equal(paid.json().status, 'paid');
  assert.equal(calls, 1);

  const again = await signed('/internal/checkout-sessions/complete', { tenantId: tenant, orderId, transientToken: 'tok' });
  assert.equal(again.json().status, 'paid');
  assert.equal(calls, 1, 'a paid order is not charged again');

  const row = (await t.seed.query(`SELECT status, gateway_txn_id FROM payments.orders WHERE id = $1`, [orderId])).rows[0] as { status: string; gateway_txn_id: string };
  assert.deepEqual(row, { status: 'paid', gateway_txn_id: 'tx-1' });
  assert.equal((await t.seed.query(`SELECT count(*)::int AS n FROM payments.outbox`)).rows[0].n, 1);
});

test('a bad token releases the order, and an amount mismatch does not mark it paid', async () => {
  outcome = new GatewayCallError('bad_transient_token');
  const created = await signed('/internal/checkout-sessions', {
    tenantId: tenant, externalRef: 'cart-2', customerEmail: 'buyer@client.test',
    item: { ref: 'roadmap-kit', title: 'Roadmap kit', listPriceMinor: 5000, currency: 'USD' }, discountMinor: 0,
  });
  const orderId = created.json().orderId as string;
  const bad = await signed('/internal/checkout-sessions/complete', { tenantId: tenant, orderId, transientToken: 'nope' });
  assert.equal(bad.statusCode, 400);
  assert.equal(bad.json().error, 'invalid_token');
  assert.equal((await t.seed.query(`SELECT status FROM payments.orders WHERE id = $1`, [orderId])).rows[0].status, 'pending');

  outcome = { decision: 'ACCEPT', transactionId: 'tx-x', providerEventId: 'evt-x', amountMinor: 1, currency: 'USD', payload: {} };
  const flagged = await signed('/internal/checkout-sessions/complete', { tenantId: tenant, orderId, transientToken: 'tok' });
  assert.equal(flagged.json().flagged, 'amount_mismatch');
  assert.equal((await t.seed.query(`SELECT status FROM payments.orders WHERE id = $1`, [orderId])).rows[0].status, 'processing');
});
