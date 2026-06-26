import { Link, createFileRoute } from '@tanstack/react-router'

import { SiteFooter } from '#/landing/site-footer'
import { SiteHeader } from '#/landing/site-header'
import { site, slogan } from '#/lib/brand'
import LinkButton from '#/components/link_button'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      {
        title: `Who We Are — ${site.name}`,
      },
      {
        name: 'description',
        content:
          'The Hard Port is a no-bullshit media agency. We tell you the truth, charge you for it, and do the work. We give a f*ck. We just don\u2019t care.',
      },
    ],
  }),
  component: AboutPage,
})

const values = [
  {
    title: 'Honest to a fault',
    description:
      'We\u2019ll tell you your "fine" is actually stuck, your boosting isn\u2019t marketing, and your last logo was a waste. You\u2019ll thank us later.',
  },
  {
    title: 'Clarity over noise',
    description:
      'We sell the map between where you are and where you want to be. Not 12 posts a month nobody asked for. Strategy first, always.',
  },
  {
    title: 'All-in or not at all',
    description:
      'We don\u2019t do maybes or half-jobs. If we take you on, we\u2019re fully in. If we don\u2019t, we\u2019ll tell you straight.',
  },
] as const

function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              Who we are
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-white uppercase md:text-5xl">
              A port is where ships go to rot.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              &quot;Hard a-port&quot; is the command you shout to swing the ship
              hard before it hits the rocks. That&apos;s the whole company.
              You&apos;ve been drifting toward the rocks and calling it
              stability. We turn the wheel.
            </p>
            <p className="mt-6 text-xl font-extrabold text-accent">{slogan}</p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-hero gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
                What we&apos;re not
              </h2>
              <p className="mt-5 text-base leading-7 text-primary/70">
                We&apos;re not your friends, your yes-men, or another vendor to
                tick a box. We&apos;re not going to clap for &quot;fine,&quot;
                hype your feelings, or sell you a plan we know you won&apos;t
                run.
              </p>
              <p className="mt-4 text-base leading-7 text-primary/70">
                We&apos;re the people who tell you the truth, charge you so it
                counts, and then actually do the work. You focus on sailing. We
                handle the ship, the crew, the identity, the campaigns.
              </p>
            </div>

            <div className="border border-primary/15 bg-secondary p-8">
              <p className="text-sm font-bold tracking-[0.18em] text-primary/40 uppercase">
                The honest disclaimer
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-primary/70">
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  We&apos;re new. We&apos;re telling you instead of hiding it.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  We&apos;ve built 3 strategies. The clients ran them solo.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  No faked numbers, reviews, or case studies. Ever.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">&#10003;</span>
                  2 businesses a month get our work free. We pick them.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              How we work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
              What you&apos;re signing up for
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="border border-primary/15 bg-white p-8"
                >
                  <h3 className="text-xl font-extrabold text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-primary/70">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero text-center">
            <h2 className="text-3xl font-extrabold text-primary uppercase md:text-4xl">
              Done being fine?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary/70">
              Apply for a free slot, or skip the line and commit. Either way,
              tell us where you actually want to be.
            </p>
            <LinkButton text="Apply for The free slot" href="/" hash="apply" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
