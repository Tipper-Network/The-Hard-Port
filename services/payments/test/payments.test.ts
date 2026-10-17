import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import type { FastifyInstance } from 'fastify';
import {
  Db,
  createPool,
  encryptField,
  generateApiKey,
  generateTotpSecret,
  hashPassword,
  hmacHex,
  signRequest,
  totpAt,
  type Keyring,
} from '@hardport/core';
import { buildApp as buildPayments } from '../src/app.js';
import type { PaymentsConfig } from '../src/config.js';
import { dispatchOutbox, type Sender } from '../src/outbox.js';
import { buildApp as buildAccess } from '../../access/src/app.js';
import type { AccessConfig } from '../../access/src/config.js';
import { createTestDb, seedMembership, seedTenant, seedUser, type TestDb } from '../../../test-support/db.js';

// End-to-end across BOTH products against one real database, using each product's own
// restricted database role:  checkout -> gateway notification -> order paid -> commission ->
// outbox -> signed event -> Access grants the entitlement -> customer can open the item.

const ADMIN = 'https://admin.test';
const ring: Keyring = { current: 'k1', keys: { k1: Buffer.alloc(32, 5) } };
const INTERNAL = { current: 'k1', keys: { k1: 'i'.repeat(40) } };
const GATEWAY_SECRET = 'fake-gateway-shared-secret';

const payConfig: PaymentsConfig = {
  host: '127.0.0.1', port: 0, adminOrigins: [ADMIN], cookieSecure: false, trustProxy: false,
  fieldKeys: ring, internalKeys: INTERNAL, accessInternalUrl: 'http://unused.invalid', commissionHoldDays: 30,
};
const accConfig: AccessConfig = {
  host: '127.0.0.1', port: 0, adminOrigins: [ADMIN], cookieSecure: false, trustProxy: false, ipPepper: 'p'.repeat(32),
  fieldKeys: ring, internalKeys: INTERNAL, keywordKeys: { current: 'k1', keys: { k1: 'w'.repeat(40) } },
  sessionTtlHours: 12, defaultFreeAfterDays: 30, loginRateLimitPerMinute: 1000,
};

let t: TestDb;
let accessDb: Db;
let paymentsDb: Db;
let pay: FastifyInstance;
let acc: FastifyInstance;
let T: string; // tenant
let U: string; // other tenant
let partnerId: string;
let secretKey = '';

const first = <R,>(rows: R[]): R => rows[0]!;

// The "network" between the products: deliver straight into the Access app, signed like production.
const sendToAccess: Sender = async (event) => {
  const body = JSON.stringify(event);
  const res = await acc.inject({
    method: 'POST', url: '/internal/events',
    headers: { 'content-type': 'application/json', 'x-hp-signature': signRequest({ keys: INTERNAL, method: 'POST', path: '/internal/events', body }) },
    payload: body,
  });
  return res.statusCode === 200;
};

async function signedPost(app: FastifyInstance, url: string, payload: unknown, keys = INTERNAL) {
  const body = JSON.stringify(payload);
  return app.inject({
    method: 'POST', url,
    headers: { 'content-type': 'application/json', 'x-hp-signature': signRequest({ keys, method: 'POST', path: url, body }) },
    payload: body,
  });
}

async function notify(tenantId: string, event: Record<string, unknown>, secret = GATEWAY_SECRET) {
  const raw = JSON.stringify(event);
  return pay.inject({
    method: 'POST', url: `/gateway/fake/${tenantId}/notify`,
    headers: { 'content-type': 'application/json', 'x-fake-signature': hmacHex(secret, raw) },
    payload: raw,
  });
}

const checkout = (over: Record<string, unknown> = {}) =>
  signedPost(pay, '/internal/checkout-sessions', {
    tenantId: T, externalRef: 'cart-1', customerEmail: 'buyer@client.test',
    item: { ref: 'roadmap-kit', title: 'Roadmap kit', listPriceMinor: 12000, currency: 'USD' },
    discountMinor: 2000, partner: { id: partnerId, commissionPct: 10 }, ...over,
  });

const orderRow = async (id: string) => first((await t.seed.query('SELECT * FROM payments.orders WHERE id = $1', [id])).rows) as Record<string, any>;
const hasAccess = async (email: string) =>
  (await acc.inject({ method: 'GET', url: '/v1/content/roadmap-kit', headers: { 'x-hp-key': secretKey, 'x-hp-customer': email } })).json().access as boolean;

before(async () => {
  t = await createTestDb();
  accessDb = new Db(createPool(t.url, 4), { testRole: 'hp_access' });
  paymentsDb = new Db(createPool(t.url, 4), { testRole: 'hp_payments' });
  pay = await buildPayments({ db: paymentsDb, config: payConfig });
  acc = await buildAccess({ db: accessDb, config: accConfig });

  T = await seedTenant(t.seed, 'alpha');
  U = await seedTenant(t.seed, 'bravo');
  partnerId = first((await t.seed.query<{ id: string }>(`INSERT INTO access.partners (tenant_id, display_name, commission_pct) VALUES ($1, 'Sara', 10) RETURNING id`, [T])).rows).id;
  await t.seed.query(`INSERT INTO access.content_items (tenant_id, slug, title, kind, access_mode, status, body_ref) VALUES ($1, 'roadmap-kit', 'Roadmap kit', 'ebook', 'paid', 'published', 'kits/roadmap.pdf')`, [T]);

  const site = first((await t.seed.query<{ id: string }>(`INSERT INTO platform.sites (tenant_id, domain) VALUES ($1, 'alpha.example') RETURNING id`, [T])).rows).id;
  const sk = generateApiKey('secret');
  secretKey = sk.key;
  await t.seed.query(`INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash) VALUES ($1, $2, 'secret', $3, $4)`, [T, site, sk.prefix, sk.hash]);

  // each tenant brings its OWN gateway credentials, encrypted with a tenant-bound context
  for (const tenant of [T, U]) {
    await t.seed.query(
      `INSERT INTO payments.gateway_accounts (tenant_id, provider, mode, merchant_id, credentials_enc) VALUES ($1, 'fake', 'test', 'm1', $2)`,
      [tenant, encryptField(JSON.stringify({ secret: tenant === T ? GATEWAY_SECRET : 'bravo-own-secret' }), ring, `gw:${tenant}:fake:test`)],
    );
  }
});

after(async () => {
  await pay.close();
  await acc.close();
  await accessDb.close();
  await paymentsDb.close();
  await t.drop();
});

describe('internal calls between the two products', () => {
  test('unsigned, tampered, replayed and wrongly-keyed requests are rejected', async () => {
    const body = JSON.stringify({ x: 1 });
    assert.equal((await pay.inject({ method: 'POST', url: '/internal/checkout-sessions', headers: { 'content-type': 'application/json' }, payload: body })).statusCode, 401);
    assert.equal((await acc.inject({ method: 'POST', url: '/internal/events', headers: { 'content-type': 'application/json' }, payload: body })).statusCode, 401);

    const sig = signRequest({ keys: INTERNAL, method: 'POST', path: '/internal/events', body });
    const ok = { 'content-type': 'application/json', 'x-hp-signature': sig };
    // valid signature, but the body does not match what was signed
    assert.equal((await acc.inject({ method: 'POST', url: '/internal/events', headers: ok, payload: JSON.stringify({ x: 2 }) })).statusCode, 401);

    const wrongKey = { current: 'k1', keys: { k1: 'z'.repeat(40) } };
    assert.equal((await signedPost(pay, '/internal/checkout-sessions', {}, wrongKey)).statusCode, 401);

    // a captured valid request cannot be replayed
    const first1 = await acc.inject({ method: 'POST', url: '/internal/events', headers: ok, payload: body });
    assert.notEqual(first1.statusCode, 401); // signature accepted (then fails validation: not a real event)
    assert.equal((await acc.inject({ method: 'POST', url: '/internal/events', headers: ok, payload: body })).statusCode, 401);
  });
});

describe('purchase flow', () => {
  let orderId = '';

  test('checkout computes the total on the server and is idempotent per reference', async () => {
    const r = await checkout();
    assert.equal(r.statusCode, 200, r.body);
    orderId = r.json().orderId;
    assert.equal(r.json().status, 'pending');
    assert.match(r.json().redirectUrl, /fake-gateway/);
    const o = await orderRow(orderId);
    assert.equal(o.total_minor, 10000);
    assert.equal(Number(o.commission_pct), 10);

    const again = await checkout();
    assert.equal(again.json().orderId, orderId, 'same reference returns the same order');
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM payments.orders WHERE external_ref = $1', ['cart-1'])).rows[0].n, 1);

    const changed = await checkout({ item: { ref: 'roadmap-kit', title: 'Roadmap kit', listPriceMinor: 500, currency: 'USD' }, discountMinor: 0 });
    assert.equal(changed.statusCode, 409, 'same reference with a different price is refused');
    assert.equal((await checkout({ externalRef: 'cart-x', discountMinor: 99999 })).statusCode, 400);
    assert.equal((await checkout({ externalRef: 'cart-y', total: 1 })).statusCode, 400, 'unknown fields (like a client-set total) are rejected');
  });

  test('before payment there is no access', async () => {
    assert.equal(await hasAccess('buyer@client.test'), false);
  });

  test('forged notifications change nothing: wrong secret, other tenant\'s secret, unknown tenant, broken body', async () => {
    const ev = { eventId: 'e-forged', orderId, decision: 'ACCEPT', amountMinor: 10000, currency: 'USD', transactionId: 'tx-f' };
    assert.equal((await notify(T, ev, 'wrong-secret')).statusCode, 401);
    assert.equal((await notify(T, ev, 'bravo-own-secret')).statusCode, 401, 'another tenant\'s credentials must not validate');
    assert.equal((await notify('99999999-9999-4999-8999-999999999999', ev)).statusCode, 401);
    assert.equal((await pay.inject({ method: 'POST', url: `/gateway/fake/${T}/notify`, headers: { 'content-type': 'application/json' }, payload: '{}' })).statusCode, 401);
    assert.equal((await orderRow(orderId)).status, 'pending');
  });

  test('a notification with the wrong amount never marks the order paid', async () => {
    const r = await notify(T, { eventId: 'e-short', orderId, decision: 'ACCEPT', amountMinor: 100, currency: 'USD', transactionId: 'tx-s' });
    assert.equal(r.json().flagged, 'amount_mismatch');
    assert.equal((await orderRow(orderId)).status, 'pending');
    assert.equal((await t.seed.query(`SELECT 1 FROM platform.audit_log WHERE action = 'payment.amount_mismatch'`)).rowCount, 1);
    assert.equal((await notify(T, { eventId: 'e-cur', orderId, decision: 'ACCEPT', amountMinor: 10000, currency: 'EUR', transactionId: 'tx-c' })).json().flagged, 'amount_mismatch');
  });

  test('a genuine ACCEPT pays the order, creates the commission and queues the event, atomically', async () => {
    const r = await notify(T, { eventId: 'e-ok', orderId, decision: 'ACCEPT', amountMinor: 10000, currency: 'USD', transactionId: 'tx-1' });
    assert.equal(r.statusCode, 200);
    const o = await orderRow(orderId);
    assert.equal(o.status, 'paid');
    assert.equal(o.gateway_txn_id, 'tx-1');

    const c = first((await t.seed.query('SELECT * FROM payments.commissions WHERE order_id = $1', [orderId])).rows) as Record<string, any>;
    assert.equal(c.amount_minor, 1000, '10% of the amount actually paid (after discount)');
    assert.equal(c.status, 'pending');
    assert.ok(new Date(c.payable_after).getTime() > Date.now() + 29 * 86_400_000, 'held for the refund window');

    const queued = await t.seed.query(`SELECT type FROM payments.outbox WHERE delivered_at IS NULL`);
    assert.deepEqual(queued.rows, [{ type: 'order.paid' }]);
  });

  test('replaying the same notification is acknowledged and changes nothing', async () => {
    const r = await notify(T, { eventId: 'e-ok', orderId, decision: 'ACCEPT', amountMinor: 10000, currency: 'USD', transactionId: 'tx-1' });
    assert.equal(r.json().duplicate, true);
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM payments.commissions')).rows[0].n, 1);
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM payments.outbox')).rows[0].n, 1);
    // a second, differently-numbered ACCEPT for an already-paid order also creates nothing new
    await notify(T, { eventId: 'e-ok-2', orderId, decision: 'ACCEPT', amountMinor: 10000, currency: 'USD', transactionId: 'tx-2' });
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM payments.commissions')).rows[0].n, 1);
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM payments.outbox')).rows[0].n, 1);
  });

  test('the outbox delivers a signed event; Access grants the entitlement exactly once', async () => {
    const down: Sender = async () => false;
    assert.deepEqual(await dispatchOutbox(paymentsDb, down), { sent: 0, failed: 1 });
    // a failed attempt is rescheduled with backoff, so it is not immediately due again
    assert.deepEqual(await dispatchOutbox(paymentsDb, sendToAccess), { sent: 0, failed: 0 });
    await t.seed.query(`UPDATE payments.outbox SET next_attempt_at = now() - interval '1 second'`);

    assert.deepEqual(await dispatchOutbox(paymentsDb, sendToAccess), { sent: 1, failed: 0 });
    assert.equal(await hasAccess('buyer@client.test'), true);
    assert.equal(await hasAccess('Buyer@Client.test'), true, 'email match ignores case');
    assert.equal(await hasAccess('stranger@client.test'), false);

    // redelivering the same event (at-least-once) must not duplicate anything
    const ev = first((await t.seed.query('SELECT payload FROM payments.outbox')).rows).payload;
    assert.equal(await sendToAccess(ev), true);
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM access.entitlements')).rows[0].n, 1);
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM access.customers')).rows[0].n, 1);
  });

  test('a refund revokes access and voids the pending commission', async () => {
    const r = await notify(T, { eventId: 'e-refund', orderId, decision: 'REFUND', amountMinor: 10000, currency: 'USD', transactionId: 'tx-r' });
    assert.equal(r.statusCode, 200);
    assert.equal((await orderRow(orderId)).status, 'refunded');
    assert.equal(first((await t.seed.query('SELECT status FROM payments.commissions')).rows).status, 'void');
    assert.deepEqual(await dispatchOutbox(paymentsDb, sendToAccess), { sent: 1, failed: 0 });
    assert.equal(await hasAccess('buyer@client.test'), false);
  });

  test('declines are recorded without granting anything', async () => {
    const r = await checkout({ externalRef: 'cart-2', customerEmail: 'second@client.test' });
    const id = r.json().orderId;
    await notify(T, { eventId: 'e-decl', orderId: id, decision: 'DECLINE', amountMinor: 10000, currency: 'USD', transactionId: 'tx-d' });
    assert.equal((await orderRow(id)).status, 'declined');
    assert.equal(await hasAccess('second@client.test'), false);
    assert.equal((await t.seed.query('SELECT count(*)::int AS n FROM payments.outbox WHERE delivered_at IS NULL')).rows[0].n, 0);
  });
});

describe('commissions: partner view, holds and payouts', () => {
  let partnerCookie = '';
  let ownerCookie = '';

  before(async () => {
    const pw = await hashPassword('Correct-Horse-9-Battery');
    const sara = await seedUser(t.seed, 'sara@partner.test', { passwordHash: pw });
    await seedMembership(t.seed, T, sara, 'partner', { partnerId });
    const boss = await seedUser(t.seed, 'boss@alpha.test', { passwordHash: pw });
    await seedMembership(t.seed, T, boss, 'staff');

    const login = async (email: string) => {
      const r = await acc.inject({ method: 'POST', url: '/auth/login', headers: { origin: ADMIN }, payload: { email, password: 'Correct-Horse-9-Battery' } });
      assert.equal(r.statusCode, 200, r.body);
      return (r.cookies as { name: string; value: string }[]).find((c) => c.name === 'hp_session')!.value;
    };
    partnerCookie = await login('sara@partner.test');
    ownerCookie = await login('boss@alpha.test');

    // a fresh paid order for a commission to look at
    const r = await checkout({ externalRef: 'cart-3', customerEmail: 'third@client.test' });
    await notify(T, { eventId: 'e-3', orderId: r.json().orderId, decision: 'ACCEPT', amountMinor: 10000, currency: 'USD', transactionId: 'tx-3' });
  });

  const get = (url: string, cookie: string) => pay.inject({ method: 'GET', url, cookies: { hp_session: cookie } });

  test('the same login works on the Payments product; a partner sees only their commissions, never orders or emails', async () => {
    const r = await get('/partner/commissions', partnerCookie);
    assert.equal(r.statusCode, 200);
    const body = r.json();
    assert.equal(body.commissions.length, 2); // the voided one and the new pending one
    assert.ok(!r.body.includes('@'), 'no customer emails');
    assert.equal(body.commissions.every((c: Record<string, unknown>) => !('order_id' in c)), true);
    assert.equal((await get('/admin/commissions', partnerCookie)).statusCode, 403);
    assert.equal((await get('/partner/commissions', ownerCookie)).statusCode, 403);
    assert.equal((await pay.inject({ method: 'GET', url: '/partner/commissions' })).statusCode, 401);
  });

  test('commissions become payable only after the hold; only payable ones can be marked paid', async () => {
    const id = first((await t.seed.query<{ id: string }>(`SELECT id FROM payments.commissions WHERE status = 'pending'`)).rows).id;
    const pay1 = (cookie: string) =>
      pay.inject({ method: 'POST', url: '/admin/commissions/mark-paid', headers: { origin: ADMIN }, cookies: { hp_session: cookie }, payload: { ids: [id], payoutRef: 'TRF-1' } });

    // staff cannot record payouts (owner/admin only)
    assert.equal((await pay1(ownerCookie)).statusCode, 403);

    // still inside the hold window: promote does nothing
    assert.equal(first((await paymentsDb.withoutTenant((q) => q.query('SELECT payments.promote_commissions() AS n'))).rows).n, 0);
    await t.seed.query(`UPDATE payments.commissions SET payable_after = now() - interval '1 day' WHERE id = $1`, [id]);
    assert.equal(first((await paymentsDb.withoutTenant((q) => q.query('SELECT payments.promote_commissions() AS n'))).rows).n, 1);
    assert.equal(first((await t.seed.query('SELECT status FROM payments.commissions WHERE id = $1', [id])).rows).status, 'payable');

    // an admin (2FA enrolled) records the payout: payable -> paid, once only
    const secret = generateTotpSecret();
    const adminId = await seedUser(t.seed, 'admin@alpha.test', { passwordHash: await hashPassword('Correct-Horse-9-Battery'), twofaEnabled: true });
    await t.seed.query('UPDATE platform.users SET twofa_secret_enc = $2 WHERE id = $1', [adminId, encryptField(secret, ring, `user:${adminId}:twofa`)]);
    await seedMembership(t.seed, T, adminId, 'admin');
    const res = await acc.inject({ method: 'POST', url: '/auth/login', headers: { origin: ADMIN }, payload: { email: 'admin@alpha.test', password: 'Correct-Horse-9-Battery', totp: totpAt(secret, Date.now()) } });
    assert.equal(res.statusCode, 200, res.body);
    const adminCookie = (res.cookies as { name: string; value: string }[]).find((c) => c.name === 'hp_session')!.value;

    assert.deepEqual((await pay1(adminCookie)).json(), { paid: 1, skipped: 0 });
    assert.deepEqual((await pay1(adminCookie)).json(), { paid: 0, skipped: 1 }, 'cannot be paid twice');
    const row = first((await t.seed.query('SELECT status, payout_ref FROM payments.commissions WHERE id = $1', [id])).rows) as { status: string; payout_ref: string };
    assert.deepEqual(row, { status: 'paid', payout_ref: 'TRF-1' });
    assert.equal((await t.seed.query(`SELECT 1 FROM platform.audit_log WHERE action = 'commission.mark_paid'`)).rowCount, 1, 'payout is audited');
  });
});
