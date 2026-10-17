import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { audit, requireRole, type AppCtx } from '../context.js';

// Staff and partner session routes. Same cookie as Access. Catalogue: docs/platform-routes.md
// GET  /partner/commissions          partner, own rows only
// GET  /admin/commissions            owner, admin, staff
// POST /admin/commissions/mark-paid  owner, admin. Records a bank payout. Does not move money.

const MarkPaidBody = z.object({ ids: z.array(z.string().uuid()).min(1).max(200), payoutRef: z.string().min(1).max(100) }).strict();

/**
 * Commission routes. Same session cookie as Access. Catalogue: docs/platform-routes.md.
 *
 * `GET /partner/commissions` — partner, own rows, no customer emails.
 * `GET /admin/commissions` — owner, admin, staff. Optional `status` query.
 * `POST /admin/commissions/mark-paid` — owner, admin. Records a bank payout. Does not move money.
 *
 * @param app - Payments Fastify instance
 * @param ctx - Database
 */
export function registerCommissionRoutes(app: FastifyInstance, ctx: AppCtx): void {
  const { db } = ctx;

  // A partner sees their own commissions only: no orders, no customer emails.
  app.get('/partner/commissions', { preHandler: requireRole(ctx, 'partner') }, async (req) =>
    db.withTenant(req.actor!, async (q) => ({
      commissions: (
        await q.query(
          `SELECT id, amount_minor, currency, status, payable_after, paid_at FROM payments.commissions WHERE partner_id = $1 ORDER BY payable_after DESC LIMIT 500`,
          [req.actor!.partnerId],
        )
      ).rows,
      totals: (
        await q.query(
          `SELECT status, count(*)::int AS n, COALESCE(sum(amount_minor), 0)::int AS amount_minor FROM payments.commissions WHERE partner_id = $1 GROUP BY status`,
          [req.actor!.partnerId],
        )
      ).rows,
    })),
  );

  app.get('/admin/commissions', { preHandler: requireRole(ctx, 'owner', 'admin', 'staff') }, async (req) => {
    const status = z.enum(['pending', 'payable', 'paid', 'void']).optional().parse((req.query as { status?: string }).status);
    return db.withTenant(req.actor!, async (q) => ({
      commissions: (
        await q.query(
          `SELECT id, partner_id, order_id, amount_minor, currency, status, payable_after, paid_at, payout_ref
           FROM payments.commissions WHERE ($1::text IS NULL OR status = $1) ORDER BY payable_after LIMIT 500`,
          [status ?? null],
        )
      ).rows,
    }));
  });

  // Payouts are made by the tenant (bank transfer); this records them. Only "payable" rows can be paid.
  app.post('/admin/commissions/mark-paid', { preHandler: requireRole(ctx, 'owner', 'admin') }, async (req) => {
    const b = MarkPaidBody.parse(req.body);
    const actor = req.actor!;
    return db.withTenant(actor, async (q) => {
      const res = await q.query<{ id: string }>(
        `UPDATE payments.commissions SET status = 'paid', paid_at = now(), payout_ref = $2 WHERE id = ANY($1::uuid[]) AND status = 'payable' RETURNING id`,
        [b.ids, b.payoutRef],
      );
      if (res.rows.length > 0) await audit(q, actor.tenantId, actor.role, 'commission.mark_paid', null, { ids: res.rows.map((r) => r.id), payoutRef: b.payoutRef }, actor.userId);
      return { paid: res.rows.length, skipped: b.ids.length - res.rows.length };
    });
  });
}
