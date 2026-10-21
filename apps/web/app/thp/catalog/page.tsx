import type { Metadata } from 'next'

import { CatalogEmpty, CatalogGrid } from '@psyferblock/access/widgets'
import { fetchCatalog } from '@psyferblock/access/server/fetch-catalog'
import { isAccessInstalled } from '@psyferblock/access/server/config'

import { ThpCatalogShell } from '@/components/access/thp-catalog-shell'
import { THP_CATALOG_PATH } from '@/lib/access-public-paths'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalog — THP Access',
  description: 'Guides, videos, and downloads from The Hard Port.',
  robots: { index: true, follow: true },
}

export default async function ThpCatalogPage() {
  const installed = isAccessInstalled()

  if (!installed) {
    return (
      <ThpCatalogShell>
        <div className="hp-catalog">
          <header className="mb-10">
            <h1 className="font-heading text-3xl font-normal uppercase md:text-4xl">Catalog</h1>
          </header>
          <CatalogEmpty />
        </div>
      </ThpCatalogShell>
    )
  }

  const accessUrl = process.env.HP_ACCESS_URL?.trim() ?? ''
  const secretKey = process.env.HP_SECRET_KEY?.trim() ?? ''
  const { items } = await fetchCatalog({ accessUrl, secretKey })

  return (
    <ThpCatalogShell>
      <div className="hp-catalog">
        <header className="mb-10">
          <h1 className="font-heading text-3xl font-normal uppercase md:text-4xl">Catalog</h1>
          {items.length > 0 ? (
            <p className="mt-3 max-w-2xl text-[oklch(0.72_0.03_250)]">
              Pick something. Open it. Paid checkout is still wiring in; free and keyword stuff works today.
            </p>
          ) : null}
        </header>
        <CatalogGrid items={items} productPathPrefix={THP_CATALOG_PATH} />
      </div>
    </ThpCatalogShell>
  )
}
