import type { Queryable } from '@hardport/core';
import { audit } from './context.js';

export interface OrderRow {
  id: string;
  status: string;
  total_minor: number;
  currency: string;
  customer_email: string;
  item_ref: string;
  partner_id: string | null;
  commission_pct: string;
}

export interface PaymentDecision {
  decision: 'ACCEPT' | 'DECLINE' | 'REFUND';
  transactionId: string;
}

/**
 * Writes the paid, declined, or refunded outcome in the caller's open transaction.
 * The caller has already checked the amount and inserted the idempotency row.
 * ACCEPT also inserts the commission (when a partner is on the order) and the outbox event Access will receive.
 *
 * @param q - Transaction already scoped to `tenantId`
 * @param tenantId - Tenant that owns the order
 * @param order - Locked order row
 * @param ev - Gateway decision and the provider transaction id
 * @param commissionHoldDays - Days before a commission becomes payable
 */
export async function applyDecision(q: Queryable, tenantId: string, order: OrderRow, ev: PaymentDecision, commissionHoldDays: number): Promise<void> {
  /** Outbox payload Access consumes. The id is stable so a replay does not create a second event. */
  const event = (type: 'order.paid' | 'order.refunded') => ({
    id: `${type}:${order.id}`,
    type,
    tenantId,
    data: { orderId: order.id, customerEmail: order.customer_email, itemRef: order.item_ref },
  });
  /** Inserts one outbox row. The dispatcher in `outbox.ts` signs it and posts it to Access. */
  const enqueue = (type: 'order.paid' | 'order.refunded') =>
    q.query(`INSERT INTO payments.outbox (tenant_id, type, payload) VALUES ($1, $2, $3)`, [tenantId, type, JSON.stringify(event(type))]);

  if (ev.decision === 'ACCEPT' && ['pending', 'processing', 'declined', 'abandoned'].includes(order.status)) {
    await q.query(`UPDATE payments.orders SET status = 'paid', paid_at = now(), gateway_txn_id = $2 WHERE id = $1`, [order.id, ev.transactionId]);
    const pct = Number(order.commission_pct);
    if (order.partner_id && pct > 0) {
      const amount = Math.round((order.total_minor * pct) / 100);
      await q.query(
        `INSERT INTO payments.commissions (tenant_id, partner_id, order_id, amount_minor, currency, payable_after)
         VALUES ($1, $2, $3, $4, $5, now() + make_interval(days => $6::int)) ON CONFLICT DO NOTHING`,
        [tenantId, order.partner_id, order.id, amount, order.currency, commissionHoldDays],
      );
    }
    await enqueue('order.paid');
  } else if (ev.decision === 'DECLINE' && ['pending', 'processing'].includes(order.status)) {
    await q.query(`UPDATE payments.orders SET status = 'declined' WHERE id = $1`, [order.id]);
  } else if (ev.decision === 'REFUND' && order.status === 'paid') {
    await q.query(`UPDATE payments.orders SET status = 'refunded' WHERE id = $1`, [order.id]);
    await q.query(`UPDATE payments.commissions SET status = 'void' WHERE order_id = $1 AND status IN ('pending', 'payable')`, [order.id]);
    const paidOut = await q.query(`SELECT 1 FROM payments.commissions WHERE order_id = $1 AND status = 'paid'`, [order.id]);
    if (paidOut.rowCount) await audit(q, tenantId, 'system', 'commission.clawback_needed', order.id);
    await enqueue('order.refunded');
  }
}
