import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductPage } from '@psyferblock/access/widgets'
import { isAccessInstalled } from '@psyferblock/access/server/config'
import { fetchContentForPage } from '@psyferblock/access/server/fetch-content'

import { ThpCatalogShell } from '@/components/access/thp-catalog-shell'
import { THP_CATALOG_PATH } from '@/lib/access-public-paths'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let title = 'Product — THP Access'
  if (!isAccessInstalled()) return { title }
  const accessUrl = process.env.HP_ACCESS_URL?.trim()
  const secretKey = process.env.HP_SECRET_KEY?.trim()
  if (!accessUrl || !secretKey) return { title }
  try {
    const data = await fetchContentForPage({ accessUrl, secretKey, slug })
    if (data.found) {
      title = data.access ? `${data.content.title} — THP Access` : `${data.teaser.title} — THP Access`
    }
  } catch {
    /* ignore */
  }
  return { title, robots: { index: true, follow: true } }
}

export default async function ThpCatalogProductPage({ params }: PageProps) {
  if (!isAccessInstalled()) notFound()

  const { slug } = await params
  const accessUrl = process.env.HP_ACCESS_URL?.trim() ?? ''
  const secretKey = process.env.HP_SECRET_KEY?.trim() ?? ''
  const publicKey = process.env.NEXT_PUBLIC_HP_PUBLIC_KEY?.trim() ?? ''

  if (!accessUrl || !secretKey) notFound()

  const initial = await fetchContentForPage({ accessUrl, secretKey, slug })
  if (!initial.found) notFound()

  return (
    <ThpCatalogShell backHref={THP_CATALOG_PATH} backLabel="All products">
      <ProductPage slug={slug} initial={initial} accessUrl={accessUrl} publicKey={publicKey} />
    </ThpCatalogShell>
  )
}
