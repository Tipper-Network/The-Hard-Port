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
| `@psyferblock/access/server` | BFF route handlers, `fetchCatalog`, `fetchContentForPage` |
| `@psyferblock/access/widgets` | `CatalogGrid`, `ProductPage`, `ProductUnlocked` |

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
