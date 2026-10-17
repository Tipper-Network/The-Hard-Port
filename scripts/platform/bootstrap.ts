import { randomBytes } from 'node:crypto';
import pg from 'pg';
import { encryptField, generateApiKey, generateTotpSecret, hashPassword, otpauthUri, parseKeyring } from '@hardport/core';

// Creates a tenant, its first owner (with mandatory 2FA) and a site with API keys.
// Prints the secrets ONCE. Run with the migration owner connection:
//
//   DATABASE_URL=postgres://owner:...@host/db FIELD_KEYS='{"current":"k1","keys":{"k1":"<base64 32 bytes>"}}' \
//   pnpm platform:bootstrap -- --slug acme --name "Acme Media" --email you@acme.com --domain acme.com --origin https://acme.com
//
// Generate a field key with:  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

/**
 * Reads `--name value` from the process arguments.
 * @param name - Flag without the leading dashes, for example `slug`
 * @throws Error when the flag or its value is missing
 */
function arg(name: string): string {
  const i = process.argv.indexOf(`--${name}`);
  const v = i > 0 ? process.argv[i + 1] : undefined;
  if (!v) throw new Error(`missing --${name}`);
  return v;
}

const url = process.env.DATABASE_URL;
const fieldKeys = process.env.FIELD_KEYS;
if (!url || !fieldKeys) throw new Error('DATABASE_URL and FIELD_KEYS are required');
const ring = parseKeyring(fieldKeys);

const slug = arg('slug');
const name = arg('name');
const email = arg('email').trim().toLowerCase();
const domain = arg('domain').toLowerCase();
const origin = arg('origin');

const password = randomBytes(12).toString('base64url'); // one-time; change it after first login
const totpSecret = generateTotpSecret();

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  await client.query('BEGIN');
  const tenant = (await client.query<{ id: string }>('INSERT INTO platform.tenants (slug, name) VALUES ($1, $2) RETURNING id', [slug, name])).rows[0]!.id;
  const user = (
    await client.query<{ id: string }>(
      `INSERT INTO platform.users (email, password_hash, twofa_enabled) VALUES ($1, $2, true)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING id`,
      [email, await hashPassword(password)],
    )
  ).rows[0]!;
  await client.query('UPDATE platform.users SET twofa_secret_enc = $2, twofa_enabled = true WHERE id = $1', [user.id, encryptField(totpSecret, ring, `user:${user.id}:twofa`)]);
  await client.query(`INSERT INTO platform.memberships (tenant_id, user_id, role) VALUES ($1, $2, 'owner')`, [tenant, user.id]);
  await client.query(`INSERT INTO platform.subscriptions (tenant_id, plan_code, status) VALUES ($1, 'starter', 'trialing')`, [tenant]);

  const site = (await client.query<{ id: string }>('INSERT INTO platform.sites (tenant_id, domain) VALUES ($1, $2) RETURNING id', [tenant, domain])).rows[0]!.id;
  const pk = generateApiKey('public');
  const sk = generateApiKey('secret');
  await client.query('INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash, allowed_origins) VALUES ($1, $2, $3, $4, $5, $6)', [tenant, site, 'public', pk.prefix, pk.hash, [origin]]);
  await client.query('INSERT INTO platform.api_keys (tenant_id, site_id, kind, key_prefix, key_hash) VALUES ($1, $2, $3, $4, $5)', [tenant, site, 'secret', sk.prefix, sk.hash]);
  await client.query('COMMIT');

  console.log(`
Tenant created: ${slug} (${tenant})

Owner login
  email:        ${email}
  password:     ${password}      (one-time; change it after first login)
  2FA secret:   ${totpSecret}
  authenticator link (paste into a QR generator or your authenticator app):
  ${otpauthUri(totpSecret, email, name)}

API keys (shown once, only hashes are stored)
  public key:   ${pk.key}      (safe in the browser; works only from ${origin})
  secret key:   ${sk.key}      (server side only; never put this in front-end code)
`);
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  await client.end();
}
