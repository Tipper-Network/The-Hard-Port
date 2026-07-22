# Docker

Run the full stack (Nest API + Next.js web) with Docker Compose.

## Quick start

```bash
cp .env.docker.example .env
# Fill DATABASE_URL and JWT_SECRET (openssl rand -hex 32)

docker compose up --build
```

- Web: http://localhost:3000  
- API: http://localhost:3001  
- Health: http://localhost:3001/intake/health  

## Services

| Service | Dockerfile | Port |
|---|---|---|
| `api` | `apps/api/Dockerfile` | 3001 |
| `web` | `apps/web/Dockerfile` | 3000 |

Root `Dockerfile` builds **web only** (legacy single-service deploy).

## Environment

| Variable | Service | Notes |
|---|---|---|
| `DATABASE_URL` | api | Neon Postgres connection string |
| `JWT_SECRET` | api | Required for auth |
| `THP_API_URL` | web | Set automatically to `http://api:3001` in compose |
| `NEXT_PUBLIC_THP_API_URL` | web (build) | Public API URL for browser OAuth links — default `http://localhost:3001` |
| `CORS_ORIGIN` | api | Web origin — default `http://localhost:3000` |
| `WEB_APP_URL` | api | OAuth redirect target — default `http://localhost:3000` |
| `RUN_MIGRATIONS` | api | Run `prisma migrate deploy` on start — default `true` |

OAuth variables: see [`apps/api/AUTH_SETUP.md`](apps/api/AUTH_SETUP.md).

## Build individually

```bash
docker build -f apps/api/Dockerfile -t thp-api .
docker build -f apps/web/Dockerfile -t thp-web \
  --build-arg NEXT_PUBLIC_THP_API_URL=http://localhost:3001 .
```

## Migrations only

```bash
docker compose run --rm api pnpm exec prisma migrate deploy
```

Set `RUN_MIGRATIONS=false` in `.env` if migrations run in CI instead.

## Production notes

- Set `NEXT_PUBLIC_THP_API_URL` to your **public** API URL at **build time** (browser auth links).
- Set `GOOGLE_CALLBACK_URL` / `META_CALLBACK_URL` to public API callback URLs.
- Use a secrets manager for `DATABASE_URL` and `JWT_SECRET` — do not commit `.env`.
