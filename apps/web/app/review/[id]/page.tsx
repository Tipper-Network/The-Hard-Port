import type { Metadata } from 'next'

import { ApplicationReviewPanel } from '@/components/review/application-review-panel'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Review Application — The Hard Port',
  robots: { index: false, follow: false },
}

type ReviewApplicationPageProps = {
  params: Promise<{ id: string }>
}

export default async function ReviewApplicationPage({ params }: ReviewApplicationPageProps) {
  const { id } = await params

  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <ApplicationReviewPanel id={id} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
