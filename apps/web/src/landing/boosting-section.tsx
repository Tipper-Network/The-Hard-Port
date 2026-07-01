const boosting = [
  'You hit the blue "Boost" button.',
  'Instagram decides who sees it. Usually people who already follow you.',
  'You pay for likes from your aunt and three bots.',
  'No offer. No funnel. No plan. No idea what happened.',
  '"It got good engagement!", engagement doesn\u2019t pay salaries.',
  'You do it again next month and call it marketing.',
]

const campaign = [
  'We decide who we want, why, and what we want them to do.',
  'A real offer, built for a real audience, with a reason to act now.',
  'A path: see it \u2192 want it \u2192 act on it. Not a single lonely post.',
  'We track what works, kill what doesn\u2019t, and double down.',
  'We measure money in vs. money out. Not vanity.',
  'It compounds. It\u2019s a system, not a slot machine.',
]

export function BoostingSection() {
  return (
    <section id="boosting" className="bg-primary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            The $20 lie
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
            Have you been boosting posts and calling it marketing?
          </h2>
          <p className="mt-5 text-base leading-7 text-white/70 md:text-lg">
            There&apos;s a difference between spending money on visibility and making
            money from it. Most businesses never see the gap. Here&apos;s what
            closing it actually looks like.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="border border-white/15 bg-white/5 p-8">
            <h3 className="text-xl font-extrabold tracking-wide text-white/50 uppercase line-through decoration-accent decoration-2">
              Boosting
            </h3>
            <p className="mt-1 text-sm font-semibold text-white/40">
              What you&apos;re doing now
            </p>
            <ul className="mt-6 space-y-4">
              {boosting.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/60">
                  <span className="mt-0.5 shrink-0 font-bold text-white/30">&times;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-accent bg-accent/10 p-8 shadow-[0_0_0_1px_var(--color-accent)]">
            <h3 className="text-xl font-extrabold tracking-wide text-accent uppercase">
              A campaign
            </h3>
            <p className="mt-1 text-sm font-semibold text-white/70">
              What actually works
            </p>
            <ul className="mt-6 space-y-4">
              {campaign.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white">
                  <span className="mt-0.5 shrink-0 font-bold text-accent">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-bold text-white">
          Boosting spends money. A campaign makes it. If that just landed for the
          first time, that&apos;s exactly the problem we fix.
        </p>
      </div>
    </section>
  )
}
