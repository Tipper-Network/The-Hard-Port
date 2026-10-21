# The Hard Port

Monorepo: **Next.js** web (`apps/web`) + **NestJS** API (`apps/api`).

## Development

```bash
pnpm install
pnpm dev          # web :3000 + intake api :3001 (apply, sign-in, /review)
pnpm dev:all      # web + api + Access :4001 (catalog, /admin/thp, everything)
pnpm dev:console  # web + Access only (no intake OAuth api)
pnpm dev:web
pnpm dev:api
pnpm dev:access   # Access service only
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

See [`docs/hardport-architecture.md`](docs/hardport-architecture.md) and [`docs/platform-routes.md`](docs/platform-routes.md) for which service calls which route. External sites install npm **`access`** (console at `/thp/*`): [`docs/access-installation-and-separation.md`](docs/access-installation-and-separation.md). CyberSource uses Microform v2. The website does not share this database.

## Database

```bash
pnpm db:migrate
pnpm db:migrate:deploy
pnpm db:studio
```

OAuth setup: [`apps/api/AUTH_SETUP.md`](apps/api/AUTH_SETUP.md).

## Web routing (Next.js App Router)

Full map: [`docs/website-sitemap.md`](docs/website-sitemap.md).

| Route | Purpose |
|---|---|
| `/` | Homepage — hero + letter eager; below-fold sections lazy-loaded |
| `/work-with-us`, `/business-levels`, `/about` | Public funnel |
| `/apply` | Engagement Readiness form → `apps/api` |
| `/sign-in`, `/review`, `/review/[id]` | **Consulting intake ops** (OAuth + JWT) — not Access platform |
| `/auth/callback`, `/auth/error` | OAuth handoff |
| `/thp/*` | **Access console** (planned) — **`@psyferblock/access`**, `<AccessApp basePath="/thp" />` |

Landing sections live in `apps/web/src/landing/`. Lazy loading: `LazySection` + `next/dynamic` in `lazy-home-sections.tsx`.

| Artifact | npm | Role |
|---|---|---|
| Access API | `@hardport/access` | Platform service `:4001` |
| Access console UI | **`@psyferblock/access`** (planned) | Installable `/thp/*` router + BFF |
