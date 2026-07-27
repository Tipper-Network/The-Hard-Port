# P01 — Production deploy

**Status:** scaffold  
**Owner:** _fill_  
**Target date:** _fill_

## Checklist

- [ ] `pnpm db:migrate:deploy` on production Postgres (Dokploy)
- [ ] `DATABASE_URL` — internal hostname on server
- [ ] `JWT_SECRET` — production value (`openssl rand -hex 32`)
- [ ] `WEB_APP_URL` — public site origin
- [ ] `CORS_ORIGIN` — public web origin(s)
- [ ] Google OAuth — callback URL → `{API}/auth/google/callback`
- [ ] Meta OAuth — callback URL → `{API}/auth/meta/callback`
- [ ] `AUTH_ALLOWLIST` — operator emails (recommended)
- [ ] `RESEND_API_KEY` + `INTAKE_NOTIFY_EMAIL` + `INTAKE_NOTIFY_FROM`
- [ ] `NEXT_PUBLIC_THP_API_URL` — baked at web **build** time (Docker)
- [ ] `NEXT_PUBLIC_SITE_URL` — production domain (OG / metadata)
- [ ] Node engine on host matches `package.json` (`22.x`)
- [ ] Smoke test: `/apply` submit → row in DB → operator email → `/review`

## Env reference

| Var | App | Notes |
|-----|-----|-------|
| _add rows as you configure_ | | |

## Rollback

_fill_

## Notes

_fill_
