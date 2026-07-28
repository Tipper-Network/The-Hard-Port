import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { site } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Privacy Notice — ${site.name}`,
  description:
    'The Hard Port collects a small amount of data to operate this site and evaluate applications. Nothing is sold. Nothing is shared with advertisers.',
}

const dataItems = [
  {
    label: 'Application data',
    detail:
      'Name, business details, and answers submitted through the application form. Used exclusively to evaluate whether THP should work with you.',
  },
  {
    label: 'First-party analytics',
    detail:
      'If you accept the site usage banner, we log pages viewed, scroll depth, and funnel events. First-party only — no Google Ads, no Meta Pixel, no ad tracking of any kind.',
  },
  {
    label: 'Review and diagnostic notes',
    detail:
      'Internal notes made during qualification and the Business Reality Diagnostic. These are part of THP\'s operational records and governed by your client agreement if you become a client.',
  },
] as const

const rights = [
  'Request to see what we hold about you',
  'Request correction of inaccurate information',
  'Request deletion of your data',
  'Object to any processing you did not consent to',
] as const

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-depth-0 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              Legal
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-normal uppercase text-secondary md:text-5xl">
              We don&apos;t sell your information. Full stop.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary/80">
              The Hard Port collects a small amount of data to operate this site and evaluate
              applications. This notice explains what we collect, why we collect it, and what
              you can do about it.
            </p>
            <p className="mt-3 text-sm text-secondary/50">
              Last updated: July 2026
            </p>
          </div>
        </section>

        <section className="bg-depth-1 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                  What we collect
                </p>
                <h2 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
                  Three things. Nothing hidden.
                </h2>
                <p className="mt-5 text-base leading-7 text-secondary/70">
                  We collect only what we need to run a diagnostic consulting practice.
                  There is no advertising infrastructure behind this site.
                </p>
              </div>

              <div className="space-y-6">
                {dataItems.map((item) => (
                  <div
                    key={item.label}
                    className="border border-secondary/15 bg-secondary/5 p-6"
                  >
                    <p className="font-bold text-secondary">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-secondary/70">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-depth-2 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <div className="grid gap-14 lg:grid-cols-2">
              <div className="space-y-10">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    How we use it
                  </p>
                  <h2 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
                    Only what&apos;s necessary
                  </h2>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-secondary/70">
                    <li className="flex gap-3">
                      <span className="font-bold text-accent">&#10003;</span>
                      Evaluate your application honestly
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-accent">&#10003;</span>
                      Understand how people engage with this site
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-accent">&#10003;</span>
                      Deliver the diagnostic and intervention if you become a client
                    </li>
                    <li className="flex gap-3 text-secondary/40">
                      <span className="font-bold">&#10007;</span>
                      Not sold to any third party — ever
                    </li>
                    <li className="flex gap-3 text-secondary/40">
                      <span className="font-bold">&#10007;</span>
                      Not shared with advertisers — we don&apos;t run ads
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    How long we keep it
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary/70">
                    <li>
                      <strong className="text-secondary">Application data —</strong>{' '}
                      90 days after a decision is made, then deleted unless you become a client.
                    </li>
                    <li>
                      <strong className="text-secondary">Analytics —</strong>{' '}
                      12-month rolling window, then purged.
                    </li>
                    <li>
                      <strong className="text-secondary">Diagnostic records —</strong>{' '}
                      Retained under the terms of your client agreement.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Cookies
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    Functional only
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    We use a single functional cookie to maintain session state. If you accept
                    analytics, a first-party analytics cookie is set. No cross-site tracking.
                    No ad cookies. No retargeting.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Your rights
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    You have options
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    Regardless of where you are, you can:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary/70">
                    {rights.map((right) => (
                      <li key={right} className="flex gap-3">
                        <span className="font-bold text-accent">&#10003;</span>
                        {right}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    EU and UK residents: GDPR rights apply. California residents: CCPA
                    rights apply. Email us and we respond within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-depth-3 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <div className="border border-secondary/15 bg-secondary/5 p-8 lg:p-12">
              <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
                Questions about your data?
              </p>
              <h2 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
                One address. One team.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-secondary/70">
                THP is a small operation. Privacy requests, corrections, and deletion requests
                all go to the same place — and get a real response.
              </p>
              <p className="mt-6 text-base font-semibold text-secondary/80">
                Email:{' '}
                <Link
                  href="mailto:setSail@thehardport.com"
                  className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  setSail@thehardport.com
                </Link>
              </p>
              <p className="mt-2 text-sm text-secondary/50">
                Response time: within 30 days of receiving your request.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
