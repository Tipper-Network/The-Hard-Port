import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { site } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Privacy — ${site.name}`,
  description: 'Privacy notice placeholder — pending legal review.',
}

/**
 * TODO(scaffold): P02 — replace with final privacy notice.
 * Draft: the-hard-port-os/operations/first-client-readiness/templates/legal/PRIVACY-NOTICE-DRAFT.md
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-depth-0 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">Privacy</p>
            <h1 className="mt-4 font-heading text-3xl uppercase text-secondary lg:text-4xl">
              Privacy notice
            </h1>
            <p className="mt-6 max-w-prose text-base leading-7 text-secondary/80">
              This page is a placeholder. Full privacy notice pending legal review.
            </p>

            <div className="mt-10 max-w-prose space-y-6 text-sm leading-7 text-secondary/70">
              <p>
                <strong className="text-secondary">What we collect today (scaffold summary):</strong>{' '}
                application form responses, operator review notes, and — if you accept the site usage
                banner — first-party analytics (pages viewed, scroll depth, funnel events). No
                third-party ad trackers.
              </p>
              <p>
                <strong className="text-secondary">Your rights, retention, and contact:</strong>{' '}
                _fill after lawyer pass._
              </p>
              <p>
                Questions:{' '}
                <Link href="mailto:setSail@thehardport.com" className="text-accent underline">
                  setSail@thehardport.com
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
