const notPromises = [
  'Guaranteed sales, profit, or virality',
  'That every applicant is accepted',
  'That every client reaches Level 2',
  'A marketing audit or social-media fix',
  'Branding or content as a substitute for business stability',
]

const notPresentedAs = [
  'A free sales call',
  'A branding consultation',
  'A content-strategy session',
  'A guaranteed route to revenue',
]

export function NotPromiseSection() {
  return (
    <section id="not-promise" className="bg-depth-6 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              What we do not promise
            </p>
            <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
              Read this before you apply.
            </h2>
            <ul className="mt-8 space-y-3">
              {notPromises.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-secondary/75">
                  <span className="font-bold text-alert">&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-secondary/15 bg-secondary/5 p-8">
            <p className="text-sm font-bold tracking-[0.18em] text-secondary/40 uppercase">
              The diagnostic is not
            </p>
            <ul className="mt-6 space-y-3">
              {notPresentedAs.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-secondary/70">
                  <span className="font-bold text-secondary/40">&mdash;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 text-secondary/60">
              You may purchase the diagnostic without committing to intervention. The
              findings are valuable even if you stop there.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
