type ProofStat = {
  value: string
  label: string
}

const fieldStats: ProofStat[] = [
  { value: '1', label: 'Active diagnostic or intervention client (field validation)' },
  { value: '8', label: 'Dimensions assessed in the Business Reality Diagnostic' },
  { value: '0', label: 'Published case studies for this service (yet)' },
  { value: 'L1→L2', label: 'The transition we are building evidence for' },
]

export function ProofSection() {
  const documentedReturn = 0
  const ourReturn = 270000

  return (
    <section id="proof" className="bg-depth-6 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-rust uppercase">
          Proof
        </p>
        <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
          We are not selling a portfolio. We are running a process.
        </h2>

        <div className="mt-8 space-y-5 text-base leading-8 text-secondary/80 md:text-lg">
          <p>
            THP is in its first{' '}
            <span className="font-bold text-secondary">field-validation cycle</span> for the
            Level 1 to Level 2 path. That means honest capacity limits, paid diagnostics,
            and no fabricated growth stories on this site.
          </p>
          <p>
            You are not buying a rebrand, a content calendar, or a 30-week package from a
            pricing page. You are buying whether your business can be examined with evidence;
            and whether the constraint we find is worth acting on.
          </p>
          <p className="border-l-4 border-accent pl-5 text-base font-semibold text-secondary">
            If you need a hundred logos before you trust us, leave. If you want a partner who
            will say when the evidence is thin, keep reading.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {fieldStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-secondary/15 bg-secondary/5 p-5 text-left"
            >
              <p className="font-heading text-3xl leading-none text-accent">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-secondary/65">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-secondary/15 bg-depth-7 p-6 lg:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-secondary/45 uppercase">
            Founder history (not the product)
          </p>
          <p className="mt-4 text-sm leading-7 text-secondary/70">
            Before this service existed, Tarek built strategies and brand systems for other
            businesses. Some clients executed the plans without ongoing retainers; one outcome
            in that era is below. That work was{' '}
            <span className="font-semibold text-secondary">clarity and direction</span>, not
            the Business Reality Diagnostic you apply for today.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-12">
            <div className="text-center">
              <p className="font-heading text-4xl leading-none text-secondary/30 line-through decoration-2 sm:text-5xl">
                ${documentedReturn.toLocaleString()}
              </p>
              <p className="mt-3 max-w-40 text-xs text-secondary/45 sm:text-sm">
                Documented return to THP from that chapter
              </p>
            </div>

            <span className="h-16 w-px bg-secondary/15 sm:h-24" aria-hidden="true" />

            <div className="text-center">
              <p className="font-heading text-5xl leading-none text-accent sm:text-6xl lg:text-7xl">
                ${ourReturn.toLocaleString()}
              </p>
              <p className="mt-3 text-sm text-secondary/70 sm:text-base">
                Value the client kept instead
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-secondary/55">
            Honest enough? Good. That is the register. The SMB service still has to earn its
            own proof in the field.
          </p>
        </div>
      </div>
    </section>
  )
}
