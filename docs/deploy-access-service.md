# Deploy Access API (`SMB-access-service` / `@hardport/access`)

Deploy **only** the platform Access HTTP API (:4001). Console and catalog UI stay on `apps/web` in **The Hard Port** repo (`@psyferblock/access`).

**GitHub:** [Tipper-Network/SMB-access-service](https://github.com/Tipper-Network/SMB-access-service)

**Layout (locked):** API code lives at **`apps/api`**, not `services/access`. Future Next app → **`apps/web`**. See `REPO-LAYOUT.md` in that repo.

---

## 0. Sync `packages/core` from monorepo (optional)

Access is developed in **`deploy/smb-access-service/`** (same tree as GitHub). After **`packages/core`** changes in Hard Port:

```bash
./scripts/publish/sync-smb-access-service.sh
cd deploy/smb-access-service
git add -A && git commit -m "sync core" && git push origin main
```

---

## 1. Platform database (once)

Use **Neon** or Postgres on the VPS — not the website intake DB.

From your laptop (owner `DATABASE_URL`):

```bash
cd deploy/smb-access-service
export DATABASE_URL='postgres://OWNER@HOST/hp_platform'
pnpm platform:migrate
# Create hp_access_login — scripts/local/ensure-access-login.sql (strong prod password)
```

Generate **production** secrets (do not reuse local `.env`):

```bash
# from Hard Port monorepo root
pnpm platform:secrets:local
```

Bootstrap tenant (save pk/sk/password/TOTP once):

```bash
export FIELD_KEYS='…'
pnpm platform:bootstrap -- \
  --slug hardport \
  --name "The Hard Port" \
  --email YOUR_EMAIL \
  --domain thehardport.com \
  --origin https://thehardport.com
```

(Run bootstrap from Hard Port monorepo; `FIELD_KEYS` must match Access env.)

---

## 2. Dokploy / Docker on VPS

**Use a separate Dokploy application** — not the Hard Port website app.

| Field | Value |
|--------|--------|
| **Git repository** | [Tipper-Network/SMB-access-service](https://github.com/Tipper-Network/SMB-access-service) |
| **Branch** | `main` |
| **Build type** | Dockerfile (not Nixpacks) |
| **Dockerfile path** | `Dockerfile` (repo root) |
| **Build context** | `.` (repo root) |
| **Expose port** | `4001` |

The **Hard Port** repo root `Dockerfile` builds **only** `apps/web` (Next, port 3000). It does **not** build `@hardport/access`. Older `services/access` paths in this monorepo are removed — Dokploy must point at **SMB-access-service**.

After deploy, map **`https://access.thehardport.com`** (or your subdomain) to this service; set `TRUST_PROXY=true` and `ADMIN_ORIGINS` to the public site origin.

### Required environment variables

| Variable | Production |
|----------|------------|
| `DATABASE_URL` | Runtime role (`hp_access_login` → platform DB) |
| `HOST` | `0.0.0.0` |
| `PORT` | `4001` |
| `ADMIN_ORIGINS` | `https://thehardport.com` |
| `COOKIE_SECURE` | `true` |
| `TRUST_PROXY` | `true` |
| `IP_PEPPER`, `FIELD_KEYS`, `INTERNAL_SIGNING_KEYS`, `KEYWORD_SESSION_KEYS` | From secrets |
| `ACCESS_TEST_OTP` | e.g. `123456` until Resend works |

Local env template: **`apps/api/.env.example`** (in SMB-access-service repo).

**Smoke:** `curl -sS https://access.thehardport.com/healthz`

---

## 3. Wire The Hard Port website

| Variable | Value |
|----------|--------|
| `HP_ACCESS_URL` | `https://access.thehardport.com` |
| `NEXT_PUBLIC_HP_PUBLIC_KEY` | Bootstrap `hp_pk_…` |
| `HP_SECRET_KEY` | Bootstrap `hp_sk_…` |
| `HP_TENANT_SLUG` | `hardport` |
| `NEXT_PUBLIC_SITE_URL` | `https://thehardport.com` |

---

## 4. Local dev (Access repo)

```bash
cd deploy/smb-access-service   # or your SMB-access-service clone
cp apps/api/.env.example apps/api/.env   # fill secrets
pnpm install
pnpm --filter @hardport/access dev
```
