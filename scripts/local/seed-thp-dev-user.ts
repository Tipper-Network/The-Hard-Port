/**
 * Dev-only: ensure tenant `hardport` and a staff owner without 2FA.
 *
 *   DATABASE_URL=postgres://owner@.../hp_platform pnpm platform:seed:dev-user
 *
 * Login: psyferblock.io@gmail.com / 123456 at /admin/thp/login
 * Requires ACCESS_SKIP_2FA=true on services/access.
 */
import pg from 'pg'
import { hashPassword } from '@hardport/core'

const email = 'psyferblock.io@gmail.com'
const password = '123456'
const tenantSlug = 'hardport'
const tenantName = 'The Hard Port (local)'

const url = process.env.DATABASE_URL?.trim()
if (!url) {
  throw new Error(
    'DATABASE_URL is required (owner role). Example:\n' +
      "  export DATABASE_URL='postgres://postgres:postgres@127.0.0.1:5433/hp_platform'\n" +
      'Do not use the ellipsis placeholder from docs — use your real host, user, password, and port.',
  )
}
if (url.includes('…') || url.includes('YOUR_PASSWORD') || url.includes('YOUR_ACTUAL_PASSWORD')) {
  throw new Error(
    'Replace YOUR_PASSWORD in DATABASE_URL with your real local postgres password.\n' +
      "  Example: export DATABASE_URL='postgres://postgres:postgres@127.0.0.1:5432/hp_platform'\n" +
      `  You passed: ${url}`,
  )
}
try {
  const parsed = new URL(url.replace(/^postgres(ql)?:/, 'http:'))
  if (!parsed.hostname || parsed.hostname === '…') {
    throw new Error('missing hostname')
  }
} catch {
  throw new Error(`DATABASE_URL is not a valid URL: ${url}`)
}

const client = new pg.Client({ connectionString: url })
await client.connect()
try {
  await client.query('BEGIN')
  const tenant = (
    await client.query<{ id: string }>(
      `INSERT INTO platform.tenants (slug, name) VALUES ($1, $2)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id`,
      [tenantSlug, tenantName],
    )
  ).rows[0]!.id

  const passwordHash = await hashPassword(password)
  const user = (
    await client.query<{ id: string }>(
      `INSERT INTO platform.users (email, password_hash, twofa_enabled, status)
       VALUES ($1, $2, false, 'active')
       ON CONFLICT (email) DO UPDATE SET
         password_hash = EXCLUDED.password_hash,
         twofa_enabled = false,
         status = 'active'
       RETURNING id`,
      [email.toLowerCase(), passwordHash],
    )
  ).rows[0]!.id

  await client.query(
    `INSERT INTO platform.memberships (tenant_id, user_id, role)
     VALUES ($1, $2, 'owner')
     ON CONFLICT (tenant_id, user_id) DO UPDATE SET role = 'owner'`,
    [tenant, user],
  )

  await client.query(
    `INSERT INTO platform.subscriptions (tenant_id, plan_code, status)
     VALUES ($1, 'starter', 'trialing')
     ON CONFLICT (tenant_id) DO NOTHING`,
    [tenant],
  )

  await client.query('COMMIT')
  console.log(`OK: ${email} is owner on tenant "${tenantSlug}". Password: ${password}`)
  console.log('Set ACCESS_SKIP_2FA=true in services/access/.env and restart Access.')
  console.log('Ensure apps/web has HP_* keys for a site on this tenant (bootstrap or manual api_keys).')
} catch (err) {
  await client.query('ROLLBACK')
  throw err
} finally {
  await client.end()
}
