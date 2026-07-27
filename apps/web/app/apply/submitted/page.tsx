import type { Metadata } from 'next'

import LinkButton from '@/components/link-button'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Application Received — The Hard Port',
  description: 'Your Engagement Readiness Application was received. What happens next.',
  robots: { index: false, follow: false },
}

export default function ApplySubmittedPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
            Application received
          </p>
          <h1 className="mt-3 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            We got it.
          </h1>
          <div className="mt-8 space-y-4 text-base leading-7 text-white/80">
            <p>
              You told us what is actually happening in your business. That is the hard
              part. We review every application; usually within 48 hours.
            </p>
            <p>
              If there is a fit for qualification, we will reach out directly at the email
              you provided. No automated drip. No form-letter consolation prize.
            </p>
            <p>
              Applying does not guarantee qualification, diagnosis, or acceptance. It
              means your submission entered the review queue.
            </p>
            <p className="text-white/60">
              If you do not hear from us within 48 hours, check spam; then reply to any
              message you have from us or submit again only if something material changed.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <LinkButton text="How THP works" href="/work-with-us" intensity={2} />
            <LinkButton text="Back to homepage" href="/" intensity={1} variant="ghost" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
