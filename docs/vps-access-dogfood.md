# VPS — dogfood Access + `/thp` on thehardport.com

**Local first:** [`local-access-dev.md`](local-access-dev.md). **Tomorrow checklist:** [`deployment.md`](deployment.md).

Deploy **`@hardport/access`** on your VPS, bootstrap tenant **`hardport`**, point **`apps/web`** env at it. Resend/email can wait; use **`ACCESS_TEST_OTP`** for partner OTP while you test UI.

## 1. Platform database

Use the same Neon (or Postgres) you use for platform migrations — **not** the website intake DB.

```bash
pnpm platform:migrate
```

## 2. Bootstrap THP tenant (once)

From a machine with migration-owner `DATABASE_URL` and `FIELD_KEYS`:

```bash
DATABASE_URL=... FIELD_KEYS='...' pnpm platform:bootstrap -- \
  --slug hardport \
  --name "The Hard Port" \
  --email you@thehardport.com \
  --domain thehardport.com \
  --origin https://thehardport.com
```

Save **password**, **TOTP secret**, **public key**, **secret key** from the output.

## 3. Run Access on the VPS

Build and run `services/access/Dockerfile` (or `pnpm --filter @hardport/access start` behind systemd).

**Required env** (see `services/access/src/config.ts`):

| Variable | Dogfood notes |
|----------|----------------|
| `DATABASE_URL` | `hp_access` login role |
| `ADMIN_ORIGINS` | `https://thehardport.com` (BFF forwards this `Origin` on mutating admin calls) |
| `COOKIE_SECURE` | `true` in prod |
| `TRUST_PROXY` | `true` behind Caddy/nginx |
| `IP_PEPPER`, `FIELD_KEYS`, `INTERNAL_SIGNING_KEYS`, `KEYWORD_SESSION_KEYS` | From your secret store |
| `ACCESS_TEST_OTP` | e.g. `123456` until Resend is wired — partner OTP emails optional |
| `RESEND_API_KEY` | Omit for now |

Expose `:4001` internally; put **`https://access.thehardport.com`** (or similar) on reverse proxy with TLS.

## 4. Website env (`apps/web`)

On Dokploy/Vercel/your web host:

| Variable | Value |
|----------|--------|
| `HP_ACCESS_URL` | `https://access.thehardport.com` |
| `NEXT_PUBLIC_HP_PUBLIC_KEY` | `pk…` from bootstrap |
| `HP_SECRET_KEY` | `sk…` from bootstrap |
| `HP_TENANT_SLUG` | `hardport` |
| `NEXT_PUBLIC_SITE_URL` | `https://thehardport.com` |

Routes are already mounted:

- UI: `/thp/*` → `@psyferblock/access`
- BFF: `/thp/api/*` → same package server handler

## 5. Smoke test

1. `GET https://access.thehardport.com/healthz` → `{ "ok": true }`
2. Open `https://thehardport.com/thp/connection` — health + keys configured
3. Staff: `/thp/login` — email, password, TOTP from bootstrap
4. Partners: create in `/thp/partners`, sign in at `/thp/partner` with portal code + `ACCESS_TEST_OTP`

## 6. Later

- Remove `ACCESS_TEST_OTP`; set `RESEND_API_KEY` + `MAIL_FROM` on Access
- Bootstrap additional tenants when you onboard other businesses (new `pk`/`sk`, their domains in key origins)
- Payments + billing tab when `@hardport/payments` is on the same VPS
