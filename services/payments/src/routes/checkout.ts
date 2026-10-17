import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { decryptField, verifyRequest } from '@hardport/core';
import { GatewayCallError } from '../adapters/cybersource/microform.js';
import type { Credentials } from '../adapters/gateway.js';
import { applyDecision, type OrderRow } from '../apply-decision.js';
import { audit, type AppCtx } from '../context.js';

const CheckoutBody = z
  .object({
    tenantId: z.string().uuid(),
    externalRef: z.string().min(1).max(100),
    customerEmail: z.string().email().max(254),
    item: z.object({
      ref: z.string().min(1).max(100),
      title: z.string().min(1).max(200),
      listPriceMinor: z.number().int().min(0).max(100_000_000),
      currency: z.string().length(3),
    }),
    discountMinor: z.number().int().min(0).default(0),
    partner: z.object({ id: z.string().uuid(), commissionPct: z.number().min(0).max(100) }).optional(),
    codeRef: z.string().max(100).optional(),
  })
  .strict();

const CompleteBody = z
  .object({
    tenantId: z.string().uuid(),
    orderId: z.string().uuid(),
    transientToken: z.string().min(1).max(20_000),
  })
  .strict();

/**
 * Signed checkout routes. The browser never calls these. Bodies and errors: docs/platform-routes.md.
 *
 * `POST /internal/checkout-sessions` is called by the tenant server (or Access).
 * The price is computed here. CyberSource returns a Microform capture context; the fake gateway returns a redirect URL.
 *
 * `POST /internal/checkout-sessions/complete` is called by the tenant server with the transient token
 * from `microform.createToken()`. An AUTHORIZED response for this order's amount marks the order paid.
 *
 * @param app - Payments Fastify instance
 * @param ctx - Database, signing keys, and the gateway adapter
 */
export function registerCheckoutRoutes(app: FastifyInstance, ctx: AppCtx): void {
  app.register(async (scope) => {
    scope.addContentTypeParser('application/json', { parseAs: 'string' }, (_req, body, done) => done(null, body));

    scope.post('/internal/checkout-sessions', async (req, reply) => {
      const raw = typeof req.body === 'string' ? req.body : '';
      const verdict = await verifyRequest({
        keys: ctx.config.internalKeys,
        header: req.headers['x-hp-signature'] as string | undefined,
        method: 'POST',
        path: req.url,
        body: raw,
        nonceStore: ctx.nonceStore,
      });
      if (!verdict.ok) return reply.code(401).send({ error: 'unauthorized' });

      let json: unknown;
      try {
        json = JSON.parse(raw);
      } catch {
        return reply.code(400).send({ error: 'invalid_json' });
      }
      const b = CheckoutBody.parse(json);
      if (b.discountMinor > b.item.listPriceMinor) return reply.code(400).send({ error: 'discount_exceeds_price' });
      const total = b.item.listPriceMinor - b.discountMinor;

      return ctx.db.withTenant({ tenantId: b.tenantId, role: 'system' }, async (q) => {
        const order = (
          await q.query<{ id: string; status: string; total_minor: number; item_ref: string; currency: string }>(
            `INSERT INTO payments.orders
               (tenant_id, external_ref, customer_email, item_ref, item_title, list_price_minor, discount_minor, total_minor, currency, partner_id, commission_pct, code_ref)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             ON CONFLICT (tenant_id, external_ref) DO UPDATE SET external_ref = EXCLUDED.external_ref
             RETURNING id, status, total_minor, item_ref, currency`,
            [b.tenantId, b.externalRef, b.customerEmail, b.item.ref, b.item.title, b.item.listPriceMinor, b.discountMinor, total, b.item.currency.toUpperCase(), b.partner?.id ?? null, b.partner?.commissionPct ?? 0, b.codeRef ?? null],
          )
        ).rows[0]!;

        // Retried request with the same reference must describe the same purchase.
        if (order.total_minor !== total || order.item_ref !== b.item.ref || order.currency !== b.item.currency.toUpperCase()) {
          return reply.code(409).send({ error: 'external_ref_conflict' });
        }
        if (order.status === 'paid') return { orderId: order.id, status: 'paid' };

        const account = (
          await q.query<{ provider: string; mode: 'test' | 'live'; credentials_enc: string }>(
            `SELECT provider, mode, credentials_enc FROM payments.gateway_accounts WHERE status = 'active' ORDER BY (mode = 'live') DESC LIMIT 1`,
          )
        ).rows[0];
        const adapter = account ? ctx.adapterFor(account.provider) : null;
        if (!account || !adapter) return reply.code(409).send({ error: 'no_gateway_account' });

        const creds = JSON.parse(decryptField(account.credentials_enc, ctx.config.fieldKeys, `gw:${b.tenantId}:${account.provider}:${account.mode}`)) as Credentials;
        let session;
        try {
          session = await adapter.createCheckout(creds, {
            orderId: order.id,
            tenantId: b.tenantId,
            totalMinor: total,
            currency: b.item.currency.toUpperCase(),
            customerEmail: b.customerEmail,
            itemTitle: b.item.title,
            mode: account.mode,
          });
        } catch (err) {
          if (err instanceof GatewayCallError) return reply.code(502).send({ error: 'gateway_unavailable' });
          throw err;
        }
        if (session.mode === 'redirect') return { orderId: order.id, status: order.status, redirectUrl: session.redirectUrl };
        await q.query(`UPDATE payments.orders SET checkout_context = $2 WHERE id = $1`, [order.id, session.captureContext]);
        return {
          orderId: order.id,
          status: order.status,
          captureContext: session.captureContext,
          clientLibrary: session.clientLibrary,
          clientLibraryIntegrity: session.clientLibraryIntegrity,
        };
      });
    });

    scope.post('/internal/checkout-sessions/complete', async (req, reply) => {
      const raw = typeof req.body === 'string' ? req.body : '';
      const verdict = await verifyRequest({
        keys: ctx.config.internalKeys,
        header: req.headers['x-hp-signature'] as string | undefined,
        method: 'POST',
        path: req.url,
        body: raw,
        nonceStore: ctx.nonceStore,
      });
      if (!verdict.ok) return reply.code(401).send({ error: 'unauthorized' });

      let json: unknown;
      try {
        json = JSON.parse(raw);
      } catch {
        return reply.code(400).send({ error: 'invalid_json' });
      }
      const b = CompleteBody.parse(json);

      const prepared = await ctx.db.withTenant({ tenantId: b.tenantId, role: 'system' }, async (q) => {
        const order = (await q.query<OrderRow & { checkout_context: string | null }>(
          `SELECT id, status, total_minor, currency, customer_email, item_ref, partner_id, commission_pct, checkout_context
           FROM payments.orders WHERE id = $1 FOR UPDATE`,
          [b.orderId],
        )).rows[0];
        if (!order) return { kind: 'missing' as const };
        if (order.status === 'paid') return { kind: 'paid' as const, orderId: order.id };
        if (order.status === 'processing') return { kind: 'busy' as const };
        if (!['pending', 'declined', 'abandoned'].includes(order.status)) return { kind: 'closed' as const };
        if (!order.checkout_context) return { kind: 'no_context' as const };

        const account = (await q.query<{ provider: string; mode: 'test' | 'live'; credentials_enc: string }>(
          `SELECT provider, mode, credentials_enc FROM payments.gateway_accounts WHERE status = 'active' ORDER BY (mode = 'live') DESC LIMIT 1`,
        )).rows[0];
        const adapter = account ? ctx.adapterFor(account.provider) : null;
        if (!account || !adapter?.completePayment) return { kind: 'no_gateway' as const };

        await q.query(`UPDATE payments.orders SET status = 'processing' WHERE id = $1`, [order.id]);
        const creds = JSON.parse(decryptField(account.credentials_enc, ctx.config.fieldKeys, `gw:${b.tenantId}:${account.provider}:${account.mode}`)) as Credentials;
        return { kind: 'ready' as const, order, creds, mode: account.mode, provider: account.provider, captureContext: order.checkout_context };
      });

      if (prepared.kind === 'missing') return reply.code(404).send({ error: 'not_found' });
      if (prepared.kind === 'paid') return { orderId: prepared.orderId, status: 'paid' };
      if (prepared.kind === 'busy') return reply.code(409).send({ error: 'payment_in_progress' });
      if (prepared.kind === 'closed') return reply.code(409).send({ error: 'order_not_payable' });
      if (prepared.kind === 'no_context') return reply.code(409).send({ error: 'checkout_not_started' });
      if (prepared.kind === 'no_gateway') return reply.code(409).send({ error: 'no_gateway_account' });

      const adapter = ctx.adapterFor(prepared.provider);
      if (!adapter?.completePayment) return reply.code(409).send({ error: 'no_gateway_account' });

      let outcome;
      try {
        outcome = await adapter.completePayment(prepared.creds, {
          orderId: prepared.order.id,
          totalMinor: prepared.order.total_minor,
          currency: prepared.order.currency,
          customerEmail: prepared.order.customer_email,
          transientToken: b.transientToken,
          captureContext: prepared.captureContext,
          mode: prepared.mode,
        });
      } catch (err) {
        if (!(err instanceof GatewayCallError)) throw err;
        const retryable = ['bad_transient_token', 'checkout_expired', 'checkout_not_started', 'invalid_gateway_credentials', 'gateway_rejected', 'unsupported_currency'].includes(err.reason);
        if (retryable) {
          await ctx.db.withTenant({ tenantId: b.tenantId, role: 'system' }, async (q) => {
            await q.query(`UPDATE payments.orders SET status = 'pending' WHERE id = $1 AND status = 'processing'`, [prepared.order.id]);
          });
        }
        if (err.reason === 'bad_transient_token') return reply.code(400).send({ error: 'invalid_token' });
        if (err.reason === 'checkout_expired') return reply.code(409).send({ error: 'checkout_expired' });
        return reply.code(502).send({ error: 'gateway_unavailable' });
      }

      return ctx.db.withTenant({ tenantId: b.tenantId, role: 'system' }, async (q) => {
        const order = (await q.query<OrderRow>(
          `SELECT id, status, total_minor, currency, customer_email, item_ref, partner_id, commission_pct FROM payments.orders WHERE id = $1 FOR UPDATE`,
          [prepared.order.id],
        )).rows[0];
        if (!order || order.status !== 'processing') return reply.code(409).send({ error: 'payment_in_progress' });

        const first = await q.query(
          `INSERT INTO payments.payment_events (tenant_id, provider, provider_event_id, order_id, decision, payload)
           VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
          [b.tenantId, prepared.provider, outcome.providerEventId, order.id, outcome.decision, JSON.stringify(outcome.payload)],
        );
        if (first.rowCount === 0) return { ok: true, duplicate: true };

        const amountMismatch = outcome.amountMinor === null || outcome.amountMinor !== order.total_minor || outcome.currency !== order.currency;
        if (outcome.decision === 'REVIEW' || (outcome.decision === 'ACCEPT' && amountMismatch)) {
          await audit(q, b.tenantId, 'system', outcome.decision === 'REVIEW' ? 'payment.needs_review' : 'payment.amount_mismatch', order.id, {
            expected: order.total_minor,
            got: outcome.amountMinor,
            currency: outcome.currency,
          });
          return { ok: true, flagged: outcome.decision === 'REVIEW' ? 'needs_review' : 'amount_mismatch' };
        }

        const decision = outcome.decision === 'ACCEPT' ? 'ACCEPT' : 'DECLINE';
        await applyDecision(q, b.tenantId, order, { decision, transactionId: outcome.transactionId }, ctx.config.commissionHoldDays);
        return { ok: true, orderId: order.id, status: decision === 'ACCEPT' ? 'paid' : 'declined' };
      });
    });
  });
}
