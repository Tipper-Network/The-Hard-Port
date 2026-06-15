import { Link, createFileRoute } from '@tanstack/react-router'

import { SiteFooter } from '#/components/landing/site-footer'
import { SiteHeader } from '#/components/landing/site-header'
import { site } from '#/lib/brand'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      {
        title: `About — ${site.name}`,
      },
      {
        name: 'description',
        content:
          'Learn about The Hard Port — a media agency built on contrast, strategy, and creative that makes brands stand out.',
      },
    ],
  }),
  component: AboutPage,
})

const values = [
  {
    title: 'Bold by default',
    description:
      'We push past safe. Every campaign should feel unmistakably yours — not a template with your logo swapped in.',
  },
  {
    title: 'Strategy first',
    description:
      'Creative without direction is noise. We map the route before we set sail, so every asset earns its place.',
  },
  {
    title: 'Built to launch',
    description:
      'Speed matters. We ship campaigns that are ready to move — from first concept to live in market.',
  },
] as const

const stats = [
  { value: '120+', label: 'Campaigns shipped' },
  { value: '15', label: 'Years at sea' },
  { value: '98%', label: 'Client retention' },
] as const

function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-navy px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-semibold tracking-[0.2em] text-orange uppercase">
              About us
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
              A port for bold brands. A crew for ambitious launches.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              The Hard Port is a media agency built on contrast — deep trust meets
              bright creative energy. We combine structured strategy with the kind
              of creative that makes people stop scrolling.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-hero gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
                Where journeys begin
              </h2>
              <p className="mt-5 text-base leading-7 text-navy/70">
                Our name isn&apos;t decorative. A port is where cargo moves, ships
                find direction, and new routes open up. That&apos;s the role we play
                for every client we take on board.
              </p>
              <p className="mt-4 text-base leading-7 text-navy/70">
                From brand launches to always-on content systems, we partner with
                teams who are ready to move — not brands looking for another vendor
                to tick a box.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-navy px-6 py-8 text-center text-white"
                >
                  <p className="text-4xl font-extrabold text-orange">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ice px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero">
            <p className="text-sm font-semibold tracking-[0.2em] text-orange uppercase">
              How we work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              What you can expect on deck
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-lg border border-navy/10 bg-white p-8"
                >
                  <h3 className="text-xl font-bold text-navy">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-navy/70">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-hero text-center">
            <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
              Ready to set sail?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-navy/70">
              Tell us where you&apos;re headed. We&apos;ll help you stand out from
              the first impression onward.
            </p>
            <Link
              to="/"
              hash="contact"
              className="mt-8 inline-flex min-w-[180px] items-center justify-center rounded-button bg-orange px-8 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
