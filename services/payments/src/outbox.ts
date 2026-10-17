import { signRequest, type Db, type SigningKeys } from '@hardport/core';

// Delivers events to the Access product: signed, retried with exponential backoff
// (claim_outbox pushes next_attempt_at forward on every claim), and safe to repeat because
// the receiver de-duplicates by event id.

export interface OutboundEvent {
  id: string;
  type: string;
  tenantId: string;
  data: unknown;
}

export type Sender = (event: OutboundEvent) => Promise<boolean>;

/**
 * Claims due outbox rows and asks `send` to deliver each one to Access.
 * A failed send stays queued. Access de-duplicates on the event id, so a retry is safe.
 *
 * @param db - Payments database. The claim runs outside a tenant, through a definer function.
 * @param send - Returns true when Access accepted the event
 * @param limit - Maximum rows to claim this pass
 */
export async function dispatchOutbox(db: Db, send: Sender, limit = 20): Promise<{ sent: number; failed: number }> {
  const rows = await db.withoutTenant(async (q) =>
    (await q.query<{ id: string; payload: OutboundEvent }>('SELECT id, payload FROM payments.claim_outbox($1)', [limit])).rows,
  );
  let sent = 0;
  let failed = 0;
  for (const row of rows) {
    let ok = false;
    try {
      ok = await send(row.payload);
    } catch {
      ok = false;
    }
    if (ok) {
      await db.withoutTenant((q) => q.query('SELECT payments.mark_outbox_delivered($1)', [row.id]));
      sent++;
    } else {
      failed++; // stays queued; claim_outbox already scheduled the next attempt
    }
  }
  return { sent, failed };
}

/**
 * Signs `POST /internal/events` and sends it to Access.
 * @param baseUrl - Access origin, from `ACCESS_INTERNAL_URL`
 * @param keys - Same `INTERNAL_SIGNING_KEYS` ring Access verifies with
 * @param fetchImpl - Fetch implementation, replaceable in tests
 */
export function httpSender(baseUrl: string, keys: SigningKeys, fetchImpl: typeof fetch = fetch): Sender {
  return async (event) => {
    const path = '/internal/events';
    const body = JSON.stringify(event);
    const res = await fetchImpl(baseUrl + path, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-hp-signature': signRequest({ keys, method: 'POST', path, body }) },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  };
}
