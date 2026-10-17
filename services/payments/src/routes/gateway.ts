import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { decryptField } from '@hardport/core';
import type { Credentials } from '../adapters/gateway.js';
import { applyDecision, type OrderRow } from '../apply-decision.js';
import { audit, type AppCtx } from '../context.js';

// Gateway notifications. Catalogue: docs/platform-routes.md
// Fake-gateway (and later async refund) notifications. A browser redirect proves nothing.
// Microform sales are marked paid in the checkout complete route, from the authorization
// response, using the same applyDecision path. This notification is authenticated with the
// tenant's own gateway credentials.
//
// Properties enforced here:
//   * authenticated: unknown tenant, no account, bad signature all return the same 401
//   * idempotent:    each provider event id is processed once (unique key on payment_events)
//   * amount-checked: a notification whose amount/currency differs from the order never marks it paid
//   * atomic:        order update, commission, outbox event and event log commit together or not at all

const Params = z.object({ provider: z.enum(['cybersource', 'fake']), tenantId: z.string().uuid() });

/**
 * `POST /gateway/:provider/:tenantId/notify`.
 *
 * Called by a payment provider, not by a browser. The fake gateway signs the raw body with `x-fake-signature`.
 * CyberSource refuses this route until webhook signing is confirmed with the bank.
 * Microform sales are marked paid by `registerCheckoutRoutes`, using the same `applyDecision` path.
 * A mismatched amount is stored and does not pay the order. Replays of the same provider event id are ignored.
 *
 * @param app - Payments Fastify instance
 * @param ctx - Database and the gateway adapter
 */
export function registerGatewayRoutes(app: FastifyInstance, ctx: AppCtx): void {
  app.register(async (scope) => {
    scope.addContentTypeParser('application/json', { parseAs: 'string' }, (_req, body, done) => done(null, body));

    scope.post('/gateway/:provider/:tenantId/notify', { config: { rateLimit: { max: 300, timeWindow: '1 minute' } } }, async (req, reply) => {
      const params = Params.safeParse(req.params);
      if (!params.success) return reply.code(401).send({ error: 'unauthorized' });
      const { provider, tenantId } = params.data;
      const adapter = ctx.adapterFor(provider);
      const raw = typeof req.body === 'string' ? req.body : '';

      return ctx.db.withTenant({ tenantId, role: 'system' }, async (q) => {
        const account = (
          await q.query<{ mode: string; credentials_enc: string }>(
            `SELECT mode, credentials_enc FROM payments.gateway_accounts WHERE provider = $1 AND status = 'active' ORDER BY (mode = 'live') DESC LIMIT 1`,
            [provider],
          )
        ).rows[0];
        if (!account || !adapter) return reply.code(401).send({ error: 'unauthorized' });
        const creds = JSON.parse(decryptField(account.credentials_enc, ctx.config.fieldKeys, `gw:${tenantId}:${provider}:${account.mode}`)) as Credentials;

        const verdict = adapter.verifyNotification(creds, raw, req.headers);
        if (!verdict.ok) return reply.code(401).send({ error: 'unauthorized' });
        const ev = verdict.event;

        // idempotency: the first delivery wins, replays are acknowledged and ignored
        const first = await q.query(
          `INSERT INTO payments.payment_events (tenant_id, provider, provider_event_id, order_id, decision, payload)
           VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
          [tenantId, provider, ev.providerEventId, ev.orderId, ev.decision, JSON.stringify(ev.payload)],
        );
        if (first.rowCount === 0) return { ok: true, duplicate: true };

        const order = (await q.query<OrderRow>('SELECT * FROM payments.orders WHERE id = $1 FOR UPDATE', [ev.orderId])).rows[0];
        if (!order) return { ok: true, ignored: 'unknown_order' }; // 200 so the gateway stops retrying; the event is stored

        if (ev.amountMinor !== order.total_minor || ev.currency.toUpperCase() !== order.currency) {
          await audit(q, tenantId, 'system', 'payment.amount_mismatch', order.id, { expected: order.total_minor, got: ev.amountMinor, currency: ev.currency });
          return { ok: true, flagged: 'amount_mismatch' };
        }

        await applyDecision(q, tenantId, order, ev, ctx.config.commissionHoldDays);
        return { ok: true };
      });
    });
  });
}
