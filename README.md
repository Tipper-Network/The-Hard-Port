# The Hard Port

Monorepo: **Next.js** web (`apps/web`) + **NestJS** API (`apps/api`).

## Development

```bash
pnpm install
pnpm dev          # web :3000 + api :3001
pnpm dev:web
pnpm dev:api
```

## Build

```bash
pnpm build
pnpm start        # production web
pnpm start:api    # production api
```

## Web env (`apps/web/.env`)

| Variable | Purpose |
|---|---|
| `THP_API_URL` | Server-side intake submit |
| `NEXT_PUBLIC_THP_API_URL` | Browser OAuth login URLs |

## Docker

See [`DOCKER.md`](DOCKER.md).

## Platform (Access + Payments)

Separate Postgres database from the website. Package manager is pnpm.

```bash
pnpm platform:migrate      # DATABASE_URL = platform migration owner
pnpm platform:bootstrap -- --slug hardport --name "The Hard Port" --email you@example.com \
  --domain thehardport.com --origin https://thehardport.com
pnpm platform:test
pnpm platform:typecheck
```

See [`docs/hardport-architecture.md`](docs/hardport-architecture.md) and [`docs/platform-routes.md`](docs/platform-routes.md) for which service calls which route. CyberSource uses Microform v2. The website does not share this database.

## Database

```bash
pnpm db:migrate
pnpm db:migrate:deploy
pnpm db:studio
```

OAuth setup: [`apps/api/AUTH_SETUP.md`](apps/api/AUTH_SETUP.md).

## Web routing (Next.js App Router)

| Route | Purpose |
|---|---|
| `/` | Homepage — hero + letter eager; below-fold sections lazy-loaded |
| `/work-with-us` | Public service explanation |
| `/apply` | Engagement Readiness form |
| `/about` | About page |
| `/auth/callback` | OAuth token handoff (operators) |
| `/auth/error` | OAuth failure |

Landing sections live in `apps/web/src/landing/`. Lazy loading: `LazySection` + `next/dynamic` in `lazy-home-sections.tsx`.
