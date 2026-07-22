# THP API

NestJS backend for intake, lifecycle, and operational data.

## Stack

- NestJS 11
- Prisma 7 (multi-file schema + `prisma.config.ts`)
- PostgreSQL (Neon) — project `the-hard-port`

## Schema layout

```text
prisma/
  schema.prisma          # generator only
  models/
    intake/application.prisma
  migrations/
prisma.config.ts         # DATABASE_URL, schema directory
src/generated/prisma/    # prisma generate output (gitignored)
```

## Development

```bash
# From repo root
pnpm dev:api

# Or with web
pnpm dev
```

## Database

```bash
pnpm db:migrate    # apply migrations
pnpm db:studio     # browse applications table
```

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/intake/health` | — | Health check |
| POST | `/intake/applications` | — | Engagement Readiness Application (public) |
| GET | `/intake/applications` | JWT | List applications (reviewers) |

Auth (Google + Meta OAuth): see [`AUTH_SETUP.md`](./AUTH_SETUP.md).

## Environment

Copy `.env.example` → `.env`. Set `DATABASE_URL` from Neon.

Web app needs `THP_API_URL=http://localhost:3001` in `apps/web/.env`.
