# @psyferblock/access

Installable Next.js UI for **THP Access** (content, partners, keywords) plus public **widgets** (catalog grid, product page).

Not the website **application review** console; that stays on your intake API (`/sign-in` → `/review`).

## Install

```bash
pnpm add @psyferblock/access
```

In `next.config.ts`:

```ts
transpilePackages: ['@psyferblock/access'],
```

**No `tsconfig` paths** are required. Imports use package exports:

| Import | Use |
|--------|-----|
| `@psyferblock/access` | `AccessApp` at `/thp/*` |
| `@psyferblock/access/server` | BFF route handlers only (`GET`, `POST`, `PATCH`) |
| `@psyferblock/access/server/config` | `isAccessInstalled`, env helpers (no AWS SDK) |
| `@psyferblock/access/server/fetch-catalog` | Server catalog fetch |
| `@psyferblock/access/server/fetch-content` | Server product fetch |
| `@psyferblock/access/widgets` | `CatalogGrid`, `ProductPage`, `ProductUnlockWidget`, … |

Catalog and widgets require env (`HP_ACCESS_URL`, keys). Use `isAccessInstalled()` on the server or `GET /api/hp/status` in the host app.

**Visitor unlock embed** (word → email → product; optional `contentSlug` to pin one product):

```tsx
import { ProductUnlockWidget } from '@psyferblock/access/widgets'

export function HeroUnlock() {
  return (
    <ProductUnlockWidget
      productPathPrefix="/thp/catalog"
      lookupUrl="/api/hp/keywords/lookup"
    />
  )
}
```

Host app must expose `POST /api/hp/keywords/lookup` (see `apps/web/app/api/hp/keywords/lookup/route.ts`) or mount the BFF path `/thp/api/public/keywords/lookup`.

## Env (host app)

See [docs/access-installation-and-separation.md](../../docs/access-installation-and-separation.md): `HP_ACCESS_URL`, `HP_SECRET_KEY`, `NEXT_PUBLIC_HP_PUBLIC_KEY`, `HP_TENANT_SLUG`, optional S3 vars for uploads.

## Minimal mount

```tsx
// app/thp/[[...slug]]/page.tsx
import { AccessApp } from '@psyferblock/access'
export default function Page() {
  return <AccessApp basePath="/thp" />
}
```

```ts
// app/thp/api/[[...path]]/route.ts
export { GET, POST, PATCH } from '@psyferblock/access/server'
```

Staff sign in at **`/thp/login`** (platform roles). That session is independent of marketing-site OAuth for reviewers.
