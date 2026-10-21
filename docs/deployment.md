# Deployment — THP Access dogfood (your todo list)

Use this when you move from **local** ([`local-access-dev.md`](local-access-dev.md)) to **VPS + thehardport.com**. Check items off as you go; nothing here runs automatically.

---

## Before you start (gather / decide)

- [ ] **Platform Postgres** host chosen (Neon project/branch or Postgres on VPS) — **not** the website intake DB
- [ ] **Subdomain** for Access API (e.g. `access.thehardport.com`) and DNS access to point it at the VPS
- [ ] **TLS** on the VPS (Caddy, nginx + certbot, or Dokploy-managed certs)
- [ ] **Secret store** for production values (Dokploy env, 1Password, etc.) — no secrets in git
- [ ] **Owner email** for bootstrap tenant (real inbox for password recovery later)
- [ ] **Authenticator app** ready for owner TOTP after bootstrap

---

## Platform database (once per environment)

- [ ] Create empty Postgres database for platform (`platform` / `hp_platform`)
- [ ] Create **migration owner** user with rights to run DDL (or use Neon owner URL)
- [ ] From your laptop or CI: `DATABASE_URL=<owner> pnpm platform:migrate`
- [ ] Create runtime login role inheriting `hp_access` (see `scripts/local/ensure-access-login.sql`; use a **strong password** in prod)
- [ ] Store **owner** URL separately from **runtime** `DATABASE_URL` (`hp_access_login` or provider equivalent)

---

## Generate production secrets (Access service)

- [ ] Run `pnpm platform:secrets:local` **on a trusted machine** and save output — **new values for prod**, do not reuse local `.env`
- [ ] `IP_PEPPER`
- [ ] `FIELD_KEYS`
- [ ] `INTERNAL_SIGNING_KEYS` (same ring will be needed on Payments when you deploy it)
- [ ] `KEYWORD_SESSION_KEYS`
- [ ] Decide partner OTP: keep `ACCESS_TEST_OTP` only until Resend works, then remove it

---

## Bootstrap tenant `hardport` (once)

- [ ] `DATABASE_URL=<owner>` + `FIELD_KEYS=<prod>` run:

```bash
pnpm platform:bootstrap -- \
  --slug hardport \
  --name "The Hard Port" \
  --email <your-owner-email> \
  --domain thehardport.com \
  --origin https://thehardport.com
```

- [ ] Save **one-time** output somewhere safe:
  - [ ] Owner password (change after first login when you add that flow)
  - [ ] TOTP secret / QR
  - [ ] `pk…` public key
  - [ ] `sk…` secret key
- [ ] Enroll TOTP in authenticator app and verify you can generate codes

---

## Deploy `@hardport/access` on VPS

- [ ] Build/run `services/access/Dockerfile` (or `pnpm --filter @hardport/access start` under systemd)
- [ ] Set container/host env:

| Variable | Production value |
|----------|------------------|
| `DATABASE_URL` | Runtime role → platform DB |
| `HOST` | `0.0.0.0` |
| `PORT` | `4001` (internal) |
| `ADMIN_ORIGINS` | `https://thehardport.com` |
| `COOKIE_SECURE` | `true` |
| `TRUST_PROXY` | `true` |
| `IP_PEPPER`, `FIELD_KEYS`, `INTERNAL_SIGNING_KEYS`, `KEYWORD_SESSION_KEYS` | From secret store |
| `ACCESS_TEST_OTP` | Optional until email works |
| `RESEND_API_KEY` + `MAIL_FROM` | When ready for real partner OTP email |

- [ ] Reverse proxy: `https://access.thehardport.com` → `127.0.0.1:4001`
- [ ] Smoke: `curl https://access.thehardport.com/healthz` → `{"ok":true}`

Reference: [`vps-access-dogfood.md`](vps-access-dogfood.md)

---

## Deploy website (`apps/web`) with console env

- [ ] Ensure deploy includes monorepo package `packages/access-ui` (Dockerfile already copies it)
- [ ] Set production env on web host:

| Variable | Value |
|----------|--------|
| `HP_ACCESS_URL` | `https://access.thehardport.com` |
| `NEXT_PUBLIC_HP_PUBLIC_KEY` | From bootstrap |
| `HP_SECRET_KEY` | From bootstrap |
| `HP_TENANT_SLUG` | `hardport` |
| `NEXT_PUBLIC_SITE_URL` | `https://thehardport.com` |

- [ ] Redeploy web after env changes
- [ ] Smoke: `https://thehardport.com/thp/connection` — health OK, keys configured

---

## Production smoke test (you)

- [ ] Staff: `https://thehardport.com/thp/login` — email, password, TOTP
- [ ] Connection page green
- [ ] Create test partner on `/thp/partners`; save portal code
- [ ] Partner: `/thp/partner` — portal code + OTP (test OTP or Resend email)
- [ ] Partner dashboard loads
- [ ] Sign out works on staff and partner
- [ ] Confirm `/review` and `/sign-in` still work (unchanged intake path)

---

## After dogfood (later, not blocking launch)

- [ ] Remove `ACCESS_TEST_OTP`; configure Resend on Access
- [ ] Rotate owner password off bootstrap one-time password
- [ ] Deploy `@hardport/payments` + wire billing tab
- [ ] Bootstrap **additional tenants** (other businesses): new slug, origin, pk/sk per site
- [ ] Publish `@psyferblock/access` to npm when external installs matter
- [ ] Monitoring: uptime on `/healthz`, Postgres backups, log retention

---

## What to send / confirm if you want help tomorrow

If you want a second pair of eyes, have ready:

1. Whether platform DB is **Neon or VPS Postgres**
2. Public URL chosen for Access API
3. Whether web and Access run on the **same VPS** or web stays on Dokploy/Vercel
4. Result of `/thp/connection` screenshot or JSON (no secrets)
5. Any failing step from the smoke test section
