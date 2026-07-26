const now = [
  'Posting when you remember to',
  '"Doing fine" (you\'re not sure)',
  'Guessing what works',
  'Founder effort holding delivery together',
  'No evidence you could defend to a sceptic',
]

const stability = [
  'A constraint identified; not a hunch',
  'Evidence of what actually moves the business',
  'Delivery that does not reset every Monday',
  'Direction you can explain without hedging',
  'Stability that survives a bad month',
]

export function GapSection() {
  return (
    <section id="gap" className="bg-depth-4 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            The distance
          </p>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            Do you know where you are?
            <br />
            Do you know what stability would look like?
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            Most owners feel the fog between here and there. THP maps that distance with
            evidence; not with a menu of services you pick from a pricing page.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_minmax(0,0.85fr)] md:gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.75fr)_minmax(0,0.75fr)]">
          <div className="border border-secondary/15 bg-secondary/5 p-5 md:p-6">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-secondary/40 uppercase">
              Where you are
            </p>
            <ul className="mt-4 space-y-2.5">
              {now.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-5 text-secondary/60">
                  <span className="mt-0.5 shrink-0 text-secondary/30">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center border border-accent bg-depth-5 px-6 py-8 shadow-[0_0_0_1px_var(--color-accent)] md:px-8 md:py-10">
            <p className="text-xs font-bold tracking-[0.22em] text-accent uppercase">
              The gap
            </p>
            <p className="mt-3 font-heading text-2xl font-normal uppercase leading-tight text-secondary md:text-3xl">
              Diagnostic. Constraint. The right work.
            </p>
            <p className="mt-4 text-sm leading-6 text-secondary/75 md:text-base">
              Not a branding package. Not a content retainer. The bridge between survival
              and stability; mapped first, executed only when the evidence says so.
            </p>
            <div className="mt-6 flex items-center gap-3 text-accent">
              <span className="hidden h-px flex-1 bg-accent/40 md:block" aria-hidden="true" />
              <span className="text-3xl font-extrabold">&rarr;</span>
              <span className="hidden h-px flex-1 bg-accent/40 md:block" aria-hidden="true" />
            </div>
          </div>

          <div className="border border-accent bg-depth-5 p-5 shadow-[0_0_0_1px_var(--color-accent)] md:p-6">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-accent uppercase">
              Where stability starts
            </p>
            <ul className="mt-4 space-y-2.5">
              {stability.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-5 text-secondary">
                  <span className="mt-0.5 shrink-0 font-bold text-accent">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-7 text-secondary/80">
          Branding, strategy, and campaigns are not what you buy first. They are what we
          deploy inside the intervention when the diagnostic proves they are required.
        </p>
      </div>
    </section>
  )
}
