import type { Metadata } from 'next'

import LinkButton from '@/components/link_button'
import { SiteFooter } from '@/shared/site-footer'
import { SiteHeader } from '@/shared/site-header'

export const metadata: Metadata = {
  title: 'Work With Us — The Hard Port',
  description: 'How The Hard Port works with Level 1 businesses.',
}

export default function WorkWithUsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <article className="prose prose-invert mx-auto max-w-3xl prose-headings:font-heading prose-headings:font-normal prose-headings:uppercase prose-headings:text-secondary prose-a:text-accent">
          <h1>How THP works with Level 1 businesses</h1>

          <h2>Who we help</h2>
          <p>
            Online or online-dependent microbusinesses with a defined offer and paying
            customers — operating in Level 1 (established but surviving), not pre-launch.
          </p>

          <h2>What condition you are probably in</h2>
          <p>
            You have customers and activity, but the business still runs on reaction,
            hope, and founder effort — not clear evidence, repeatable delivery, or a
            path to stability.
          </p>

          <h2>What THP does</h2>
          <ol>
            <li>Application — you describe your business honestly</li>
            <li>Qualification — we decide if THP should diagnose you</li>
            <li>
              <strong>Business Reality Diagnostic</strong> (paid) — evidence-based
              assessment
            </li>
            <li>Findings — what the evidence supports</li>
            <li>
              Intervention (optional, separate agreement) — Level 1-to-Level-2 stability
              work
            </li>
          </ol>
          <p>
            THP is not a content calendar, rebrand, or ad-buying service. Execution
            happens inside the intervention when a diagnosed constraint requires it.
          </p>

          <h2>What we do not promise</h2>
          <ul>
            <li>Guaranteed sales, profit, or virality</li>
            <li>That every applicant is accepted</li>
            <li>That every client reaches Level 2</li>
            <li>A marketing audit or social-media fix</li>
          </ul>

          <h2>Why the diagnostic is not a marketing audit</h2>
          <p>
            A marketing audit reviews ads and content. The Business Reality Diagnostic
            reviews business condition across eight dimensions, identifies the primary
            constraint to stability, and is valuable even if you do not continue to
            intervention.
          </p>

          <h2>Capacity</h2>
          <p>
            During our first field-validation cycle, THP accepts one active diagnostic
            or intervention client at a time.
          </p>

          <h2>Apply</h2>
          <p>
            Discovery and application are free. The diagnostic is a paid professional
            service. Applying does not guarantee acceptance.
          </p>
        </article>

        <div className="mx-auto mt-12 flex max-w-3xl justify-center">
          <LinkButton text="Engagement Readiness Application" href="/apply" intensity={4} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
