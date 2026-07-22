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
