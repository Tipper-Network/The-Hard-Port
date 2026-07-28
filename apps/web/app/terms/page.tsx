import type { Metadata } from 'next'
import Link from 'next/link'

import LinkButton from '@/components/link-button'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { site } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Terms of Service — ${site.name}`,
  description:
    'The terms governing your use of thehardport.com and THP\'s services. Short, because the model is simple.',
}

const notIncluded = [
  'Guaranteed revenue, profit, or follower growth',
  'That every applicant is accepted or receives a response',
  'That every client progresses from Level 1 to Level 2',
  'A social media audit, content calendar, or rebrand',
  'A guarantee that applying leads to a diagnostic',
] as const

export default function TermsPage() {
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
              What you&apos;re agreeing to. No small-print tricks.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary/80">
              These terms govern your use of thehardport.com and THP&apos;s services. They are
              short because the model is simple. If something is unclear, email us.
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
                  What THP is
                </p>
                <h2 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
                  A diagnostic service. Not a marketing agency.
                </h2>
                <p className="mt-5 text-base leading-7 text-secondary/70">
                  The Hard Port is a business diagnostic and intervention service for
                  established Level 1 microbusinesses — real customers, real delivery,
                  founder still inside the operation.
                </p>
                <p className="mt-4 text-base leading-7 text-secondary/70">
                  We are not a posting agency, a rebrand shop, a lead-generation machine,
                  or a social media manager. Execution only happens inside the intervention
                  when a diagnosed constraint specifically requires it.
                </p>
              </div>

              <div className="border border-secondary/15 bg-secondary/5 p-8">
                <p className="text-sm font-bold tracking-[0.18em] text-secondary/40 uppercase">
                  Not included — ever
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-secondary/70">
                  {notIncluded.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="font-bold text-secondary/30">&#10007;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-depth-2 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
              The process
            </p>
            <h2 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
              Three distinct agreements. Each clearly scoped.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <article className="border border-secondary/15 bg-secondary/5 p-8">
                <p className="text-xs font-bold tracking-widest text-accent uppercase">
                  Stage 1
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-secondary">Applying</h3>
                <p className="mt-3 text-sm leading-6 text-secondary/70">
                  Free and non-binding. Submitting an application does not create a contract,
                  guarantee a response, or commit THP to any course of action. We may decline
                  without explanation. No debt is incurred on either side.
                </p>
              </article>

              <article className="border border-secondary/15 bg-secondary/5 p-8">
                <p className="text-xs font-bold tracking-widest text-accent uppercase">
                  Stage 2
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-secondary">
                  Business Reality Diagnostic
                </h3>
                <p className="mt-3 text-sm leading-6 text-secondary/70">
                  A fixed-scope, fixed-fee professional service. Fee is stated in writing
                  before any agreement is signed. Payment is due before diagnostic work
                  begins. No refunds once work has commenced. Findings are evidence-based —
                  not a guarantee of any business outcome.
                </p>
                <p className="mt-3 text-sm leading-6 text-secondary/70">
                  The diagnostic report remains THP&apos;s intellectual property until full
                  payment is received.
                </p>
              </article>

              <article className="border border-secondary/15 bg-secondary/5 p-8">
                <p className="text-xs font-bold tracking-widest text-accent uppercase">
                  Stage 3
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-secondary">Intervention</h3>
                <p className="mt-3 text-sm leading-6 text-secondary/70">
                  Optional. Governed by a separate client agreement with its own payment,
                  scope, and cancellation terms. The diagnostic is complete whether or not
                  you proceed to intervention.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-depth-3 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <div className="grid gap-14 lg:grid-cols-2">
              <div className="space-y-10">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Confidentiality
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    Both directions
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    THP treats your application and business information as confidential. We do
                    not share it with third parties except where required by law.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-secondary/70">
                    You agree not to reproduce, resell, or publicly share THP&apos;s proprietary
                    diagnostic framework, methodology, or reports without written permission.
                    This applies during and after any engagement.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Limitation of liability
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    We are responsible for our work
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    THP&apos;s total liability for any claim arising from our services is limited
                    to the fees paid for the specific service that gave rise to the claim. We
                    are not liable for indirect or consequential losses — including revenue not
                    earned, decisions made based on findings, or outcomes after intervention.
                  </p>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Capacity
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    One client at a time
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    During field validation, THP accepts one active diagnostic or intervention
                    client at a time. This is a real constraint, not a marketing device.
                    Application timing affects availability.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Changes to these terms
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    You will be told
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    We may update these terms as THP evolves. If you are an active client,
                    we will notify you by email before changes take effect. Continued use of
                    this site after notice constitutes acceptance.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                    Disputes
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-normal uppercase text-secondary">
                    Talk first
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-secondary/70">
                    Contact{' '}
                    <Link
                      href="mailto:setSail@thehardport.com"
                      className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                      setSail@thehardport.com
                    </Link>{' '}
                    before initiating any formal process. We will attempt good-faith resolution
                    within 30 days. THP operates under the laws of its registered jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-depth-4 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero text-center">
            <h2 className="font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
              Ready to be examined?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-secondary/70">
              Application is free. The diagnostic is paid professional work. Applying does not
              guarantee acceptance. If that feels right, apply.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <LinkButton text="How THP works" href="/work-with-us" intensity={3} />
              <LinkButton text="Apply" href="/apply" intensity={4} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
