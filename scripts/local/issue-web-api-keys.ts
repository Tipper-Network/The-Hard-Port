/**
 * Dev-only: mint a fresh public + secret API key pair for an existing tenant site
 * and print lines for apps/web/.env.local.
 *
 *   DATABASE_URL=postgres://owner@.../hp_platform pnpm platform:issue:web-keys
 *
 * Does not revoke older keys. Restart `pnpm dev:web` after updating env.
 */
import pg from 'pg'
import { generateApiKey } from '@hardport/core'

const tenantSlug = (process.env.TENANT_SLUG ?? 'hardport').trim()
const siteOrigin = (process.env.SITE_ORIGIN ?? 'http://localhost:3000').replace(/\/$/, '')

const url = process.env.DATABASE_URL?.trim()
if (!url) {
  throw new Error(
    'DATABASE_URL is required (postgres owner). Example:\n' +
      "  export DATABASE_URL='postgres://postgres:postgres@127.0.0.1:5432/hp_platform'\n" +
      '  pnpm platform:issue:web-keys',
  )
}

const client = new pg.Client({ connectionString: url })
await client.connect()
try {
  const tenant = (
    await client.query<{ id: string }>('SELECT id FROM platform.tenants WHERE slug = $1', [tenantSlug])
  ).rows[0]
  if (!tenant) throw new Error(`tenant not found: ${tenantSlug}`)

  let site = (
    await client.query<{ id: string; domain: string }>(
      'SELECT id, domain FROM platform.sites WHERE tenant_id = $1 ORDER BY created_at ASC LIMIT 1',
      [tenant.id],
    )
  ).rows[0]

  if (!site) {
    const domain = new URL(siteOrigin).hostname
    site = (
      await client.query<{ id: string; domain: string }>(
        'INSERT INTO platform.sites (tenant_id, domain) VALUES ($1, $2) RETURNING id, domain',
        [tenant.id, domain],
      )
    ).rows[0]!
    console.error(`Created site ${site.domain} (${site.id}) for tenant ${tenantSlug}`)
  }

  const pk = generateApiKey('public')
  const sk = generateApiKey('secret')
  await client.query(
    `INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash, allowed_origins)
     VALUES ($1, $2, 'public', $3, $4, $5)`,
    [tenant.id, site.id, pk.prefix, pk.hash, [siteOrigin]],
  )
  await client.query(
    `INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash, allowed_origins)
     VALUES ($1, $2, 'secret', $3, $4, $5)`,
    [tenant.id, site.id, sk.prefix, sk.hash, []],
  )

  console.log(`
Paste into apps/web/.env.local (then restart pnpm dev:web):

NEXT_PUBLIC_HP_PUBLIC_KEY=${pk.key}
HP_SECRET_KEY=${sk.key}

Public key is allowed from: ${siteOrigin}
`)
} finally {
  await client.end()
}
