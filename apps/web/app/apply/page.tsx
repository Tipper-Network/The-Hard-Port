import type { Metadata } from 'next'

import { EngagementReadinessForm } from '@/landing/engagement-readiness-form'
import { SiteFooter } from '@/shared/site-footer'
import { SiteHeader } from '@/shared/site-header'

export const metadata: Metadata = {
  title: 'Apply — The Hard Port',
  description: 'Engagement Readiness Application for The Hard Port.',
}

export default function ApplyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
            Stage 2 — Engagement Readiness
          </p>
          <h1 className="mt-3 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            Apply
          </h1>
          <p className="mt-4 text-base leading-7 text-white/75">
            Tell us what is actually happening in your business. We review whether
            qualification makes sense.{' '}
            <a href="/work-with-us" className="text-accent underline">
              Read how THP works first
            </a>
            .
          </p>
          <div className="mt-10">
            <EngagementReadinessForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
