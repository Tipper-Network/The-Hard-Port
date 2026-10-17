import { randomBytes } from 'node:crypto';
import pg from 'pg';
import { migrate } from '../scripts/platform/migrate.js';

// Each test file gets its own throw-away database, migrated from scratch, so tests
// exercise the REAL schema, policies and grants. Needs a Postgres superuser:
//   TEST_ADMIN_URL=postgres://postgres:postgres@localhost:5432/postgres

const ADMIN_URL = process.env.TEST_ADMIN_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres';

export interface TestDb {
  url: string;
  /** Superuser pool: bypasses RLS. Use for seeding and for "what is really in the table" checks. */
  seed: pg.Pool;
  drop(): Promise<void>;
}

/**
 * Creates a throw-away database, runs every migration, and returns a superuser pool.
 * The database name is `hp_test_` plus random hex. Call `drop` when the test finishes.
 */
export async function createTestDb(): Promise<TestDb> {
  const name = `hp_test_${randomBytes(5).toString('hex')}`;
  const admin = new pg.Client({ connectionString: ADMIN_URL });
  await admin.connect();
  await admin.query(`CREATE DATABASE ${name}`);
  await admin.end();

  const u = new URL(ADMIN_URL);
  u.pathname = `/${name}`;
  const url = u.toString();
  await migrate(url, () => undefined);
  const seed = new pg.Pool({ connectionString: url, max: 4 });

  return {
    url,
    seed,
    /** Ends the pool and drops the database, including open connections. */
    async drop() {
      await seed.end();
      const a = new pg.Client({ connectionString: ADMIN_URL });
      await a.connect();
      await a.query(`DROP DATABASE IF EXISTS ${name} WITH (FORCE)`);
      await a.end();
    },
  };
}

/**
 * Inserts a tenant. The display name is the slug in uppercase.
 * @param seed - Superuser pool from `createTestDb`
 * @param slug - Unique tenant slug
 * @returns The new tenant id
 */
export async function seedTenant(seed: pg.Pool, slug: string): Promise<string> {
  const r = await seed.query<{ id: string }>('INSERT INTO platform.tenants (slug, name) VALUES ($1, $2) RETURNING id', [slug, slug.toUpperCase()]);
  return r.rows[0]!.id;
}

/**
 * Inserts a user row. Password and TOTP fields stay null unless the test supplies them.
 * @param seed - Superuser pool from `createTestDb`
 * @param email - Login email
 * @param opts.passwordHash - Stored scrypt string, when the test will log in
 * @param opts.twofaSecretEnc - Encrypted TOTP secret
 * @param opts.platformAdmin - Platform-wide admin flag
 * @returns The new user id
 */
export async function seedUser(
  seed: pg.Pool,
  email: string,
  opts: { passwordHash?: string; twofaSecretEnc?: string; twofaEnabled?: boolean; platformAdmin?: boolean } = {},
): Promise<string> {
  const r = await seed.query<{ id: string }>(
    `INSERT INTO platform.users (email, password_hash, twofa_enabled, twofa_secret_enc, is_platform_admin)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [email, opts.passwordHash ?? null, opts.twofaEnabled ?? false, opts.twofaSecretEnc ?? null, opts.platformAdmin ?? false],
  );
  return r.rows[0]!.id;
}

/**
 * Attaches a user to a tenant with a role. Partner and business ids are optional.
 * @param seed - Superuser pool from `createTestDb`
 * @param tenantId - Tenant from `seedTenant`
 * @param userId - User from `seedUser`
 * @param role - One of the actor roles
 * @param extra.partnerId - Set for a partner membership
 * @param extra.businessId - Set for a business membership
 */
export async function seedMembership(
  seed: pg.Pool,
  tenantId: string,
  userId: string,
  role: string,
  extra: { partnerId?: string; businessId?: string } = {},
): Promise<void> {
  await seed.query('INSERT INTO platform.memberships (tenant_id, user_id, role, partner_id, business_id) VALUES ($1, $2, $3, $4, $5)', [
    tenantId,
    userId,
    role,
    extra.partnerId ?? null,
    extra.businessId ?? null,
  ]);
}
