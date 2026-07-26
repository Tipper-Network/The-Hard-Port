const boosting = [
  'You hit the blue "Boost" button.',
  'The platform picks who sees it; usually people who already follow you.',
  'You pay for visibility with no offer, no path, no measurement.',
  '"Good engagement"; engagement doesn\'t pay salaries.',
  'You repeat it next month and call it marketing.',
]

const structuredWork = [
  'The diagnostic finds what is actually blocking stability; not what feels urgent.',
  'Work is scoped to a diagnosed constraint; not a shopping list.',
  'When campaigns are required, they have an offer, an audience, and a reason to act.',
  'Brand and messaging work happens when the evidence says identity is the bottleneck.',
  'We measure whether the business moved; not whether a post performed.',
]

export function MisdiagnosisSection() {
  return (
    <section id="misdiagnosis" className="bg-depth-3 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Common misdiagnosis
          </p>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            Boosting posts is not a strategy. It is a symptom.
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            Most Level 1 businesses treat visibility spend as progress. THP does not sell
            boosts or content calendars. When the work requires campaigns, branding, or
            messaging; it enters through the intervention, scoped to what the diagnostic found.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="border border-secondary/10 bg-secondary/5 p-8 opacity-90">
            <h3 className="font-heading text-xl font-normal tracking-wide text-alert/80 uppercase">
              Boosting
            </h3>
            <p className="mt-1 text-sm font-semibold text-secondary/40">
              What busy looks like
            </p>
            <ul className="mt-6 space-y-4">
              {boosting.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-secondary/45">
                  <span className="mt-0.5 shrink-0 font-bold text-alert/80">&times;</span>
                  <span className="line-through decoration-secondary/25">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-accent bg-accent/10 p-8 shadow-[0_0_0_1px_var(--color-accent)]">
            <h3 className="font-heading text-xl font-normal tracking-wide text-accent uppercase">
              Scoped work
            </h3>
            <p className="mt-1 text-sm font-semibold text-secondary/70">
              What the intervention actually does
            </p>
            <ul className="mt-6 space-y-4">
              {structuredWork.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-secondary">
                  <span className="mt-0.5 shrink-0 font-bold text-accent">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-7 text-secondary/80">
          You are not buying a campaign package. You are buying whether your business can
          reach stability; and the right work shows up when the evidence demands it.
        </p>
      </div>
    </section>
  )
}
