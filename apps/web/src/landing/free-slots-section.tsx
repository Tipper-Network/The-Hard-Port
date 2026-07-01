import { freeSlots } from '#/lib/brand'

const criteria = [
  'You actually have a business. Not a "someday" idea.',
  'You’re coachable. We talk, we discuss, and we map. We don’t argue.',
  'You trust us to choose the proper plan, no feelings attached.',
  'You’re interesting enough that the work makes us better too.',
]

export function FreeSlotsSection() {
  return (
    <section
      id="apply"
      className="relative overflow-hidden bg-primary px-6 py-20 lg:px-12 lg:py-28"
    >
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-hero">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="inline-flex w-fit items-center gap-2 border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs font-bold tracking-[0.18em] text-accent uppercase">
              {freeSlots.perMonth} free slots / month
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
              Every month we pick {freeSlots.perMonth} businesses and work for
              free.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80 md:text-lg">
              No catch. Two real businesses a month get the full treatment &mdash;
              strategy, brand, campaign &mdash; on the house.
            </p>
            <p className="mt-4 text-base leading-7 text-white/70">
              Why? Because we&apos;re starting a movement. Because we want design,
              branding, and strategy to be accessible for more people who are
              intentional and trying. The catch isn&apos;t money.{' '}
              <span className="font-bold text-white">
                The catch is we choose. Not you.
              </span>{' '}
              You apply. We decide if you&apos;re worth it.
            </p>


            <p className="mt-4 text-sm text-white/50">
              Most applications get a polite no. We&apos;d rather be honest than
              busy.
            </p>
          </div>

          <div className="border border-white/15 bg-white/5 p-8">
            <h3 className="text-lg font-extrabold tracking-wide text-white uppercase">
              Who we actually pick
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Read this before you waste your time (and ours).
            </p>
            <ul className="mt-7 space-y-5">
              {criteria.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="shrink-0 text-xl font-extrabold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-6 text-white/85">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm font-bold text-white">
              Not picked? You can always just pay us. Funny how that works.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
