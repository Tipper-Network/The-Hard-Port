# Local dev — Access API + `/thp` console

Run the **platform** stack on your machine before touching the VPS. Website intake (`apps/api`, `/review`) can stay on its own DB; this uses a **separate** Postgres for Access only.

## Prerequisites

- Node 22 + pnpm 9
- A **platform** Postgres (pick one path below) — not the website intake DB

---

## Pick a database (A / B / C)

### A. Postgres already on your machine (no Docker) — recommended if Docker pull fails

You already have something listening on **5432**. Create a dedicated DB:

```bash
psql -h 127.0.0.1 -U postgres -d postgres -f scripts/local/create-platform-db.sql
```

Owner URL (use **your** postgres password):

```text
postgres://postgres:YOUR_PASSWORD@127.0.0.1:5432/hp_platform
```

### B. Docker (`5433`)

```bash
docker compose -f docker-compose.platform-dev.yml up -d
```

Owner URL:

```text
postgres://postgres:postgres@127.0.0.1:5433/hp_platform
```

#### Docker pull error: `network is unreachable` on `2606:4700:…` (IPv6)

Docker Hub auth is being tried over **IPv6**; your network has no working IPv6 route. **IPv4 to Docker Hub works** — force IPv4 or skip Docker (path A or C).

Try in order:

1. **Prefer IPv4 for all apps** (Linux, then log out/in or reboot):

```bash
# /etc/gai.conf (needs sudo)
sudo tee -a /etc/gai.conf <<'EOF'
precedence ::ffff:0:0/96  100
EOF
```

Restart Docker Desktop / `sudo systemctl restart docker`, then:

```bash
docker compose -f docker-compose.platform-dev.yml pull
docker compose -f docker-compose.platform-dev.yml up -d
```

2. **Disable IPv6 in Docker** (`/etc/docker/daemon.json`, then restart docker):

```json
{
  "ip6tables": false
}
```

3. **Skip Docker** — use path **A** (local `:5432`) or **C** (Neon).

### C. Neon (or other hosted Postgres)

Create an empty database/branch for **platform only**. Use the provider **owner** connection string as `DATABASE_URL` for migrate/bootstrap. Create `hp_access_login` (adapt password) with `ensure-access-login.sql` and fix the `GRANT CONNECT ON DATABASE …` line to your DB name.

---

## 2. Migrate + runtime login role

```bash
export DATABASE_URL='postgres://postgres:YOUR_PASSWORD@127.0.0.1:5432/hp_platform'   # or :5433 / Neon
pnpm platform:migrate
psql "$DATABASE_URL" -f scripts/local/ensure-access-login.sql
```

## 3. Access service secrets

```bash
pnpm platform:secrets:local
```

Copy the printed `IP_PEPPER`, `FIELD_KEYS`, etc. into `services/access/.env` (start from `services/access/.env.example`).

## 4. Bootstrap tenant `hardport` (once per DB)

Use the **same owner** `DATABASE_URL` as step 2. `FIELD_KEYS` must match `services/access/.env`.

```bash
export DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5433/hp_platform
export FIELD_KEYS='…'   # from services/access/.env

pnpm platform:bootstrap -- \
  --slug hardport \
  --name "The Hard Port (local)" \
  --email you@example.com \
  --domain localhost \
  --origin http://localhost:3000
```

Save the printed **password**, **TOTP secret**, **public key**, **secret key**.

Put keys in `apps/web/.env.local` (see `apps/web/.env.local.example`).

## 5. Run two processes

**Terminal A — Access API**

```bash
pnpm dev:access
# → http://127.0.0.1:4001/healthz
```

**Terminal B — website + console**

```bash
pnpm dev:web
# → http://localhost:3000
```

Or one command (same two servers):

```bash
pnpm dev:console
```

## 6. What to click

| URL | Purpose |
|-----|---------|
| http://localhost:3000/thp/connection | BFF env + Access health |
| http://localhost:3000/thp/login | Staff (password + TOTP from bootstrap) |
| http://localhost:3000/thp/partners | Create partner → copy portal code |
| http://localhost:3000/thp/partner | Partner login; OTP **`123456`** if `ACCESS_TEST_OTP=123456` on Access |

Partner email is **not** sent locally unless `RESEND_API_KEY` is set; the fixed test OTP is enough for UI dogfood.

## 7. Using Neon instead of Docker

1. Create a dedicated DB (not the website intake DB).
2. `DATABASE_URL=… pnpm platform:migrate`
3. Run `ensure-access-login.sql` adapted for your DB name / create `hp_access_login` with your password.
4. Point `services/access/.env` `DATABASE_URL` at the **login** role, not the owner.
5. Bootstrap with `--origin http://localhost:3000`.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `/thp/connection` health false | Access not running or wrong `HP_ACCESS_URL` |
| Staff login 403 `bad_origin` | `ADMIN_ORIGINS` must include `http://localhost:3000`; BFF sends `Origin` from `NEXT_PUBLIC_SITE_URL` |
| Partner OTP fails | Set `ACCESS_TEST_OTP=123456` on Access; use exactly that code |
| `misconfigured` on BFF | Fill `HP_ACCESS_URL`, `HP_SECRET_KEY`, `NEXT_PUBLIC_HP_PUBLIC_KEY` in `apps/web/.env.local` |
| Content upload `503` / `s3_not_configured` | Set `HP_S3_BUCKET`, `HP_S3_PUBLIC_BASE_URL`, `AWS_REGION`, and AWS creds on **`services/access/.env`**; restart Access |

Production deploy checklist: [`deployment.md`](deployment.md).
