import type { Metadata } from 'next'

import { CatalogGrid } from '@psyferblock/access/widgets'
import { fetchCatalog } from '@psyferblock/access/server/fetch-catalog'
import { isAccessInstalled } from '@psyferblock/access/server/config'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

import './catalog.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalog — The Hard Port',
  description: 'Guides, videos, and downloads from The Hard Port.',
}

export default async function CatalogPage() {
  const installed = isAccessInstalled()

  if (!installed) {
    return (
      <>
        <SiteHeader />
        <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
          <div className="hp-catalog mx-auto max-w-3xl">
            <h1 className="font-heading text-3xl font-normal uppercase text-secondary">Catalog</h1>
            <p className="mt-4 text-secondary/80">
              THP Access is not configured on this deploy (set HP_ACCESS_URL, HP_SECRET_KEY, and NEXT_PUBLIC_HP_PUBLIC_KEY).
            </p>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  const accessUrl = process.env.HP_ACCESS_URL?.trim() ?? ''
  const secretKey = process.env.HP_SECRET_KEY?.trim() ?? ''
  const { items } = await fetchCatalog({ accessUrl, secretKey })

  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="hp-catalog mx-auto max-w-5xl">
          <header className="mb-10">
            <h1 className="font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">Catalog</h1>
            {items.length > 0 ? (
              <p className="mt-3 max-w-2xl text-secondary/80">
                Pick something. Open it. Paid checkout is still wiring in; free and keyword stuff works today.
              </p>
            ) : null}
          </header>
          <CatalogGrid items={items} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
