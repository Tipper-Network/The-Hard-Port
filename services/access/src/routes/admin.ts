import { randomUUID } from 'node:crypto';
import type { FastifyInstance, FastifyReply } from 'fastify';
import { z } from 'zod';
import { encryptField, generateApiKey } from '@hardport/core';
import { audit, pgCode, requireRole, type AppCtx } from '../context.js';
import { fail, ok, respond } from '../respond.js';
import { normalizeKeyword } from '../rules.js';

// Staff session routes for a tenant's own operators. Catalogue: docs/platform-routes.md
// Tenant back-office. Every body schema is .strict(): unknown fields (like tenant_id) are
// rejected, so mass-assignment is impossible. The tenant always comes from the session.

const staff = ['owner', 'admin', 'staff'] as const;
const admins = ['owner', 'admin'] as const;

const ContentBody = z
  .object({
    slug: z.string().regex(/^[a-z0-9][a-z0-9-]{0,80}$/),
    title: z.string().min(1).max(200),
    summary: z.string().max(1000).optional(),
    kind: z.enum(['guide', 'part', 'video', 'session', 'ebook', 'download']),
    accessMode: z.enum(['open', 'keyword_first', 'paid']).default('keyword_first'),
    freeFrom: z.string().datetime().optional(),
    bodyRef: z.string().max(500).optional(),
    bookingUrl: z.string().url().max(500).optional(),
    priceMinor: z.number().int().min(0).max(100_000_000).optional(),
    currency: z.string().length(3).optional(),
    status: z.enum(['draft', 'published']).default('draft'),
  })
  .strict();

const KeywordBody = z.object({ word: z.string().min(1).max(60), contentSlug: z.string().max(81), campaignId: z.string().uuid().optional() }).strict();
const PartnerBody = z.object({ displayName: z.string().min(1).max(100), commissionPct: z.number().min(0).max(100).default(0), payoutDetails: z.string().max(500).optional() }).strict();
const CampaignBody = z
  .object({
    title: z.string().min(1).max(200),
    platform: z.enum(['youtube', 'short', 'tiktok', 'instagram', 'x', 'other']).optional(),
    postUrl: z.string().url().max(500).optional(),
    triggerWord: z.string().max(40).optional(),
    partnerId: z.string().uuid().optional(),
  })
  .strict();
const GrantBody = z.object({ email: z.string().email().max(254), contentSlug: z.string().max(81), note: z.string().max(300).optional() }).strict();
const SiteBody = z.object({ domain: z.string().min(3).max(253).regex(/^[a-z0-9.-]+$/), origins: z.array(z.string().url().max(200)).min(1).max(10) }).strict();

/**
 * Staff session routes. Cookie from `POST /auth/login`. Unsafe methods also require an admin Origin.
 * Tenant id always comes from the session. Unknown body fields are rejected.
 *
 * `GET /admin/content`, `POST /admin/content`, `POST /admin/partners`, `POST /admin/campaigns`,
 * `POST /admin/keywords`, `GET /admin/keywords/misses`, `POST /admin/access/grant` — owner, admin, staff.
 * `POST /admin/sites` — owner, admin. Returns the public and secret keys once.
 *
 * @param app - Access Fastify instance
 * @param ctx - Database and field-encryption keys
 */
export function registerAdminRoutes(app: FastifyInstance, ctx: AppCtx): void {
  const { db, config } = ctx;

  // Database constraint violations become clean 4xx answers; anything else is a real error.
  /**
   * Turns unique and foreign-key failures into 409 or 400. Other errors propagate.
   * @param reply - Fastify reply
   * @param work - Transaction that may throw a Postgres error
   */
  const withDbErrors = async (reply: FastifyReply, work: Promise<unknown>) => {
    try {
      return await work;
    } catch (err) {
      const c = pgCode(err);
      if (c === '23505') return reply.code(409).send({ error: 'already_exists' });
      if (c === '23503') return reply.code(400).send({ error: 'unknown_reference' });
      if (c === '23514') return reply.code(400).send({ error: 'invalid_value' });
      throw err;
    }
  };

  app.get('/admin/content', { preHandler: requireRole(ctx, ...staff) }, async (req) =>
    db.withTenant(req.actor!, async (q) => ({
      items: (await q.query('SELECT id, slug, title, kind, access_mode, free_from, status, price_minor, currency FROM access.content_items ORDER BY created_at DESC LIMIT 500')).rows,
    })),
  );

  app.post('/admin/content', { preHandler: requireRole(ctx, ...staff) }, async (req, reply) => {
    const b = ContentBody.parse(req.body);
    const actor = req.actor!;
    return withDbErrors(
      reply,
      respond(
        reply,
        db.withTenant(actor, async (q) => {
          const row = (
            await q.query<{ id: string }>(
              `INSERT INTO access.content_items
                 (tenant_id, slug, title, summary, kind, access_mode, free_from, body_ref, booking_url, price_minor, currency, status, published_at)
               VALUES ($1, $2, $3, $4, $5, $6,
                       CASE WHEN $6 = 'keyword_first' THEN COALESCE($7::timestamptz, now() + make_interval(days => $13::int)) ELSE $7::timestamptz END,
                       $8, $9, $10, $11, $12, CASE WHEN $12 = 'published' THEN now() END)
               RETURNING id`,
              [actor.tenantId, b.slug, b.title, b.summary ?? null, b.kind, b.accessMode, b.freeFrom ?? null, b.bodyRef ?? null, b.bookingUrl ?? null, b.priceMinor ?? null, b.currency ?? null, b.status, config.defaultFreeAfterDays],
            )
          ).rows[0]!;
          await audit(q, actor, 'content.create', row.id, { slug: b.slug, accessMode: b.accessMode });
          return ok({ id: row.id }, 201);
        }),
      ),
    );
  });

  app.post('/admin/partners', { preHandler: requireRole(ctx, ...staff) }, async (req, reply) => {
    const b = PartnerBody.parse(req.body);
    const actor = req.actor!;
    const id = randomUUID(); // generated here so the encryption context can include it
    return withDbErrors(
      reply,
      respond(
        reply,
        db.withTenant(actor, async (q) => {
          const enc = b.payoutDetails ? encryptField(b.payoutDetails, config.fieldKeys, `partner:${id}:payout`) : null;
          await q.query('INSERT INTO access.partners (id, tenant_id, display_name, commission_pct, payout_details_enc) VALUES ($1, $2, $3, $4, $5)', [id, actor.tenantId, b.displayName, b.commissionPct, enc]);
          await audit(q, actor, 'partner.create', id, { displayName: b.displayName, commissionPct: b.commissionPct });
          return ok({ id }, 201);
        }),
      ),
    );
  });

  app.post('/admin/campaigns', { preHandler: requireRole(ctx, ...staff) }, async (req, reply) => {
    const b = CampaignBody.parse(req.body);
    const actor = req.actor!;
    return withDbErrors(
      reply,
      respond(
        reply,
        db.withTenant(actor, async (q) => {
          const row = (
            await q.query<{ id: string }>(
              'INSERT INTO access.campaigns (tenant_id, title, platform, post_url, trigger_word, partner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
              [actor.tenantId, b.title, b.platform ?? null, b.postUrl ?? null, b.triggerWord ?? null, b.partnerId ?? null],
            )
          ).rows[0]!;
          await audit(q, actor, 'campaign.create', row.id, { title: b.title });
          return ok({ id: row.id }, 201);
        }),
      ),
    );
  });

  app.post('/admin/keywords', { preHandler: requireRole(ctx, ...staff) }, async (req, reply) => {
    const b = KeywordBody.parse(req.body);
    const word = normalizeKeyword(b.word);
    if (!word) return reply.code(400).send({ error: 'invalid_word' });
    const actor = req.actor!;
    return withDbErrors(
      reply,
      respond(
        reply,
        db.withTenant(actor, async (q) => {
          const content = (await q.query<{ id: string }>('SELECT id FROM access.content_items WHERE slug = $1', [b.contentSlug])).rows[0];
          if (!content) return fail(400, 'unknown_reference');
          const row = (
            await q.query<{ id: string }>('INSERT INTO access.keywords (tenant_id, word, content_id, campaign_id) VALUES ($1, $2, $3, $4) RETURNING id', [actor.tenantId, word, content.id, b.campaignId ?? null])
          ).rows[0]!;
          await audit(q, actor, 'keyword.create', row.id, { word });
          return ok({ id: row.id, word }, 201);
        }),
      ),
    );
  });

  // What visitors typed that matched nothing in the last 7 days: typos and unmet demand.
  app.get('/admin/keywords/misses', { preHandler: requireRole(ctx, ...staff) }, async (req) =>
    db.withTenant(req.actor!, async (q) => ({
      misses: (
        await q.query(
          `SELECT keyword_text AS word, count(*)::int AS tries FROM access.events
           WHERE type = 'keyword_lookup' AND matched = false AND created_at > now() - interval '7 days'
           GROUP BY keyword_text ORDER BY tries DESC LIMIT 50`,
        )
      ).rows,
    })),
  );

  // Manual entitlement. Checkout grants the same row from order.paid; this is the operator override.
  app.post('/admin/access/grant', { preHandler: requireRole(ctx, ...staff) }, async (req, reply) => {
    const b = GrantBody.parse(req.body);
    const actor = req.actor!;
    return withDbErrors(
      reply,
      respond(
        reply,
        db.withTenant(actor, async (q) => {
          const content = (await q.query<{ id: string }>('SELECT id FROM access.content_items WHERE slug = $1', [b.contentSlug])).rows[0];
          if (!content) return fail(400, 'unknown_reference');
          const customer = (
            await q.query<{ id: string }>(
              `INSERT INTO access.customers (tenant_id, email) VALUES ($1, $2)
               ON CONFLICT (tenant_id, lower(email)) DO UPDATE SET email = access.customers.email RETURNING id`,
              [actor.tenantId, b.email.trim()],
            )
          ).rows[0]!;
          const granted = await q.query(
            `INSERT INTO access.entitlements (tenant_id, customer_id, content_id, source, order_ref) VALUES ($1, $2, $3, 'admin_grant', $4)
             ON CONFLICT (tenant_id, customer_id, content_id) WHERE revoked_at IS NULL AND customer_id IS NOT NULL DO NOTHING`,
            [actor.tenantId, customer.id, content.id, b.note ?? null],
          );
          await audit(q, actor, 'access.grant', content.id, { customerId: customer.id, note: b.note });
          return ok({ granted: granted.rowCount === 1 }, granted.rowCount === 1 ? 201 : 200);
        }),
      ),
    );
  });

  // Create a site with its keys. Raw keys are returned ONCE; only hashes are stored.
  app.post('/admin/sites', { preHandler: requireRole(ctx, ...admins) }, async (req, reply) => {
    const b = SiteBody.parse(req.body);
    const actor = req.actor!;
    return withDbErrors(
      reply,
      respond(
        reply,
        db.withTenant(actor, async (q) => {
          const site = (await q.query<{ id: string }>('INSERT INTO platform.sites (tenant_id, domain) VALUES ($1, $2) RETURNING id', [actor.tenantId, b.domain])).rows[0]!;
          const pk = generateApiKey('public');
          const sk = generateApiKey('secret');
          await q.query('INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash, allowed_origins) VALUES ($1, $2, $3, $4, $5, $6)', [actor.tenantId, site.id, 'public', pk.prefix, pk.hash, b.origins]);
          await q.query('INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash, allowed_origins) VALUES ($1, $2, $3, $4, $5, $6)', [actor.tenantId, site.id, 'secret', sk.prefix, sk.hash, []]);
          await audit(q, actor, 'site.create', site.id, { domain: b.domain });
          return ok({ siteId: site.id, publicKey: pk.key, secretKey: sk.key, note: 'Store the secret key now; it cannot be shown again.' }, 201);
        }),
      ),
    );
  });
}
