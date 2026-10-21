# Access service — v1 API additions

Platform HTTP API: `@hardport/access` (`services/access`, port 4001).

## Session probe (new)

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/auth/session` | Bearer or cookie | `{ ok, tenant, role, partnerId }` or `401` |

## Admin partners (list)

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/admin/partners` | staff session | `{ items: [{ id, display_name, email, commission_pct, created_at }] }` |

## Partner portal auth (new)

| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/auth/partner/request-otp` | — | `{ tenantSlug, email, portalCode }` → always `{ ok: true }` on unknown email/code |
| POST | `/auth/partner/verify-otp` | — | `{ tenantSlug, email, otp }` → cookie or BFF body session |

**BFF:** send header `x-hp-session-mode: body` on verify (and staff login) to receive `{ sessionToken, expiresInSeconds, tenant, role }` instead of `Set-Cookie`.

**Replay session:** `Authorization: Bearer <sessionToken>` on `/admin/*` and `/partner/*` (same as cookie).

## Admin partners (updated)

`POST /admin/partners` body now requires **`email`**. Optional **`portalCode`**; if omitted, one is generated.

Response **`201`**: `{ ok: true, id, portalCode }` — **`portalCode` shown once**.

## Environment (Access service)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Partner OTP email (optional in dev) |
| `MAIL_FROM` | e.g. `Access <access@psyferblock.io>` |
| `PARTNER_OTP_TTL_MINUTES` | Default 10 |
| `PARTNER_SESSION_TTL_HOURS` | Default 8 (BFF should use browser session cookie) |

## Migration

Run platform migrate after pulling: **`006_partner_portal.sql`**.

```bash
pnpm platform:migrate
```
