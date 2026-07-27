import type { Metadata } from 'next'

import LinkButton from '@/components/link-button'
import { site, slogan } from '@/lib/brand'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: `Who We Are — ${site.name}`,
  description:
    'The Hard Port investigates why established microbusinesses stay trapped in survival mode; and what it takes to become stable enough to grow responsibly.',
}

const commitments = [
  {
    title: 'No sugar, ever',
    description:
      'If you are "doing fine," that is the problem. We will tell you what the evidence suggests; not what makes the conversation comfortable.',
  },
  {
    title: 'Clarity over noise',
    description:
      'We investigate business condition: demand, retention, operations, identity. Not content volume for its own sake.',
  },
  {
    title: 'Examination, not reassurance',
    description:
      'Application is free. The diagnostic is paid and fixed-scope. We do not promise acceptance, virality, or a magic rebrand.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-depth-0 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              Who we are
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-normal uppercase text-secondary md:text-5xl">
              A port is where ships go to rot.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary/80">
              &quot;Hard a-port&quot; is the command you shout to swing the ship hard before
              it hits the rocks. That is the whole company. You have been drifting and
              calling it stability. We help you see what is actually happening — then
              decide whether THP should examine it with you.
            </p>
            <p className="mt-6 text-xl font-extrabold text-accent">{slogan}</p>
          </div>
        </section>

        <section className="bg-depth-1 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-hero gap-14 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
                What we&apos;re not
              </h2>
              <p className="mt-5 text-base leading-7 text-secondary/70">
                Not a posting agency. Not a rebrand shop. Not a lead-gen machine. Not
                people who will clap because you showed up to a call.
              </p>
              <p className="mt-4 text-base leading-7 text-secondary/70">
                THP works with established Level 1 microbusinesses — real customers, real
                delivery, founder still inside the operation — who need clarity on why
                stability will not arrive from more activity alone.
              </p>
            </div>

            <div className="border border-secondary/15 bg-secondary/5 p-8">
              <p className="text-sm font-bold tracking-[0.18em] text-secondary/40 uppercase">
                No spin
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-secondary/70">
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  Field validation is live — one active diagnostic or intervention client
                  at a time.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  Applying does not guarantee acceptance, diagnosis, or intervention.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  No fabricated case studies or growth guarantees.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  The Business Reality Diagnostic is evidence work — not a marketing
                  audit.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-depth-2 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              How we work
            </p>
            <h2 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
              What you are signing up for
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {commitments.map((item) => (
                <article
                  key={item.title}
                  className="border border-secondary/15 bg-secondary/5 p-8"
                >
                  <h3 className="text-xl font-extrabold text-secondary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary/70">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <ol className="mt-14 space-y-3 text-base leading-7 text-secondary/70">
              <li>1. Application — you describe the business honestly</li>
              <li>2. Qualification — we decide if THP should diagnose you</li>
              <li>3. Business Reality Diagnostic (paid) — evidence-based assessment</li>
              <li>4. Findings — what the evidence supports</li>
              <li>
                5. Intervention (optional) — Level 1-to-Level-2 stability work, separate
                agreement
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-depth-3 px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero text-center">
            <h2 className="font-heading text-3xl font-normal uppercase text-secondary md:text-4xl">
              Done being fine?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-secondary/70">
              Read how THP works. Apply only if you are ready to be examined — not
              reassured.
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
