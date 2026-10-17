import type { FastifyReply, FastifyRequest } from 'fastify';
import { cookieName, resolveSessionActor, type ActorRole, type Db, type NonceStore, type Queryable, type SessionActor } from '@hardport/core';
import type { GatewayAdapter } from './adapters/gateway.js';
import type { PaymentsConfig } from './config.js';

export interface AppCtx {
  db: Db;
  config: PaymentsConfig;
  nonceStore: NonceStore;
  adapterFor: (provider: string) => GatewayAdapter | null;
}

declare module 'fastify' {
  interface FastifyRequest {
    actor?: SessionActor;
  }
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Same session cookie as Access. Both products must be on one host when the cookie uses the `__Host-` prefix.
 * Unsafe methods require an Origin in `ADMIN_ORIGINS`.
 *
 * @param ctx - Payments app context
 * @param roles - Roles allowed to pass
 * @returns A preHandler that sets `req.actor` or sends 401 or 403
 */
export function requireRole(ctx: AppCtx, ...roles: ActorRole[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    if (!SAFE_METHODS.has(req.method)) {
      const origin = req.headers.origin;
      if (typeof origin !== 'string' || !ctx.config.adminOrigins.includes(origin)) return reply.code(403).send({ error: 'bad_origin' });
    }
    const actor = await resolveSessionActor(ctx.db, req.cookies[cookieName(ctx.config.cookieSecure)]);
    if (!actor) return reply.code(401).send({ error: 'unauthenticated' });
    if (!roles.includes(actor.role)) return reply.code(403).send({ error: 'forbidden' });
    req.actor = actor;
  };
}

/**
 * Appends one audit row. Used for payment mismatches and payout records, including system actions that have no user.
 * @param q - Transaction scoped to `tenantId`
 * @param tenantId - Tenant the action belongs to
 * @param role - Actor role, or `system` for a gateway outcome
 * @param action - Stable name such as `payment.amount_mismatch`
 * @param target - Order or commission id, or null
 * @param details - Extra JSON
 * @param userId - Staff user when the action came from a session
 */
export async function audit(q: Queryable, tenantId: string, role: string, action: string, target: string | null, details?: unknown, userId?: string): Promise<void> {
  await q.query('INSERT INTO platform.audit_log (tenant_id, actor_user_id, actor_role, action, target, details) VALUES ($1, $2, $3, $4, $5, $6)', [
    tenantId,
    userId ?? null,
    role,
    action,
    target,
    details === undefined ? null : JSON.stringify(details),
  ]);
}
