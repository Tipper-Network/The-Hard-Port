import type { Metadata } from 'next'

import { CatalogGrid } from '@psyferblock/access/widgets'
import { fetchCatalog } from '@psyferblock/access/server'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

import '../catalog/catalog.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalog — The Hard Port',
  description: 'Guides, videos, and downloads from The Hard Port.',
}

function requireEnv(name: string): string {
  const v = process.env[name]?.trim()
  if (!v) throw new Error(`${name} is required for /catalog`)
  return v
}

export default async function CatalogPage() {
  const items = await fetchCatalog({
    accessUrl: requireEnv('HP_ACCESS_URL'),
    secretKey: requireEnv('HP_SECRET_KEY'),
  })

  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="hp-catalog mx-auto max-w-5xl">
          <header className="mb-10">
            <h1 className="font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">Catalog</h1>
            <p className="mt-3 max-w-2xl text-secondary/80">
              Pick something. Open it. Paid checkout is still wiring in; free and keyword stuff works today.
            </p>
          </header>
          <CatalogGrid items={items} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
