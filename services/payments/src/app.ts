import Fastify, { type FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import { ZodError } from 'zod';
import { MemoryNonceStore, type Db, type NonceStore } from '@hardport/core';
import type { PaymentsConfig } from './config.js';
import type { AppCtx } from './context.js';
import { getAdapter, type GatewayAdapter } from './adapters/gateway.js';
import { registerCheckoutRoutes } from './routes/checkout.js';
import { registerGatewayRoutes } from './routes/gateway.js';
import { registerCommissionRoutes } from './routes/commissions.js';

export interface BuildDeps {
  db: Db;
  config: PaymentsConfig;
  nonceStore?: NonceStore;
  adapters?: Partial<Record<string, GatewayAdapter>>;
}

/**
 * Builds the Payments HTTP server: checkout, gateway notify, and commissions.
 * @param deps - Database, config, and an optional adapter map used by tests
 */
export async function buildApp(deps: BuildDeps): Promise<FastifyInstance> {
  const ctx: AppCtx = {
    db: deps.db,
    config: deps.config,
    nonceStore: deps.nonceStore ?? new MemoryNonceStore(),
    adapterFor: (provider) => deps.adapters?.[provider] ?? getAdapter(provider),
  };
  const app = Fastify({ logger: false, trustProxy: deps.config.trustProxy, bodyLimit: 200_000 });

  await app.register(cookie);
  await app.register(rateLimit, { global: false });

  app.addHook('onRequest', async (_req, reply) => {
    reply.header('x-content-type-options', 'nosniff');
    reply.header('referrer-policy', 'no-referrer');
    reply.header('cache-control', 'no-store');
  });

  app.setErrorHandler((err: Error & { statusCode?: number }, _req, reply) => {
    if (err instanceof ZodError) return reply.code(400).send({ error: 'invalid_request', fields: err.issues.map((i) => i.path.join('.')) });
    if (err.statusCode && err.statusCode < 500) return reply.code(err.statusCode).send({ error: err.statusCode === 429 ? 'rate_limited' : 'request_failed' });
    console.error('[payments] unhandled error:', err.message);
    return reply.code(500).send({ error: 'internal' });
  });

  app.get('/healthz', async () => ({ ok: true }));

  registerCheckoutRoutes(app, ctx);
  registerGatewayRoutes(app, ctx);
  registerCommissionRoutes(app, ctx);
  return app;
}
