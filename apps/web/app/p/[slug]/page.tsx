import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductPage } from '@psyferblock/access/widgets'
import { isAccessInstalled } from '@psyferblock/access/server/config'
import { fetchContentForPage } from '@psyferblock/access/server/fetch-content'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

function requireEnv(name: string): string {
  const v = process.env[name]?.trim()
  if (!v) throw new Error(`${name} is required for /p/[slug] product pages`)
  return v
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let title = 'Product — The Hard Port'
  try {
    const data = await fetchContentForPage({
      accessUrl: requireEnv('HP_ACCESS_URL'),
      secretKey: requireEnv('HP_SECRET_KEY'),
      slug,
    })
    if (data.found) {
      title = data.access ? `${data.content.title} — The Hard Port` : `${data.teaser.title} — The Hard Port`
    }
  } catch {
    /* env missing at build — fall back */
  }
  return { title, robots: { index: true, follow: true } }
}

export default async function ProductRoutePage({ params }: PageProps) {
  if (!isAccessInstalled()) notFound()

  const { slug } = await params
  const accessUrl = requireEnv('HP_ACCESS_URL')
  const secretKey = requireEnv('HP_SECRET_KEY')
  const publicKey = process.env.NEXT_PUBLIC_HP_PUBLIC_KEY?.trim() ?? ''

  const initial = await fetchContentForPage({ accessUrl, secretKey, slug })
  if (!initial.found) notFound()

  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <ProductPage slug={slug} initial={initial} accessUrl={accessUrl} publicKey={publicKey} />
      </main>
      <SiteFooter />
    </>
  )
}
