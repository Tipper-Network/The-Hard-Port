const now = [
  'Posting when you remember to',
  '"Doing fine" (you\u2019re not sure)',
  'Guessing what works',
  'Competing on price',
  'Hoping someone notices',
]

const want = [
  'A brand people actually recognise',
  'Knowing your numbers cold',
  'Campaigns that print customers',
  'Charging what you\u2019re worth',
  'Being the obvious choice',
]

export function GapSection() {
  return (
    <section id="gap" className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            The only thing we sell
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-primary md:text-4xl lg:text-[2.75rem]">
            Do you know where you are? <br/>Do you know where you want to be?
          </h2>
          <p className="mt-5 text-base leading-7 text-primary/70 md:text-lg">
            You have no idea what&apos;s in between. That fog, the distance
            between &quot;<span className="italic font-bold">here</span>&quot; and &quot;<span className="italic font-bold">there</span>&quot;, is the only thing we
            sell. We map your journey.
          </p>
          <p className="mt-5 text-base leading-7 text-primary/70 md:text-lg">
            We don&apos;t sell you content. We sell clarity, strategy and
            execution. We close the gap.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_minmax(0,0.85fr)] md:gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.75fr)_minmax(0,0.75fr)]">
          <div className="border border-primary/15 bg-white p-5 md:p-6">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-primary/40 uppercase">
              Where you are
            </p>
            <ul className="mt-4 space-y-2.5">
              {now.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-5 text-primary/60"
                >
                  <span className="mt-0.5 shrink-0 text-primary/30">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center border border-accent bg-primary px-6 py-8 shadow-[0_0_0_1px_var(--color-accent)] md:px-8 md:py-10">
            <p className="text-xs font-bold tracking-[0.22em] text-accent uppercase">
              The Gap
            </p>
            <p className="mt-3 text-2xl font-extrabold leading-tight text-white md:text-3xl">
              Strategy. Brand. Campaigns.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">
              The bridge you keep putting off. The fog between &quot;here&quot; and
              &quot;there.&quot; This is what we live for &mdash; mapping the
              distance, and then closing it.
            </p>
            <div className="mt-6 flex items-center gap-3 text-accent">
              <span className="hidden h-px flex-1 bg-accent/40 md:block" aria-hidden="true" />
              <span className="text-3xl font-extrabold">&rarr;</span>
              <span className="hidden h-px flex-1 bg-accent/40 md:block" aria-hidden="true" />
            </div>
          </div>

          <div className="border border-accent bg-primary p-5 shadow-[0_0_0_1px_var(--color-accent)] md:p-6">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-accent uppercase">
              Where you want to be
            </p>
            <ul className="mt-4 space-y-2.5">
              {want.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-5 text-white">
                  <span className="mt-0.5 shrink-0 font-bold text-accent">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-bold text-primary">
          Your business doesn&apos;t need more content. It needs a clear direction,
          a strategy that means something, and someone who sees it through.
        </p>
      </div>
    </section>
  )
}
