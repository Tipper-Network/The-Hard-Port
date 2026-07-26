import LinkButton from '@/components/link_button'

const instrumentGroups = [
  {
    title: 'Identity & messaging',
    items: [
      'Positioning and message hierarchy',
      'Brand language and visual identity',
      'Offer presentation and profile copy',
    ],
  },
  {
    title: 'Content & campaigns',
    items: [
      'Content strategy tied to a diagnosed constraint',
      'Campaign architecture when outreach is the bottleneck',
      'Performance review; not posting for its own sake',
    ],
  },
  {
    title: 'Customer & operations',
    items: [
      'Customer evidence and feedback loops',
      'Workflows, capacity rules, delivery standards',
      'Founder knowledge turned into repeatable systems',
    ],
  },
]

export function ExecutionSection() {
  return (
    <section id="execution" className="bg-depth-5 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Inside the intervention
          </p>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            We don&apos;t advertise a menu. We handle what the business needs.
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            THP is not a branding agency or a campaign shop. When the diagnostic and
            intervention require identity work, messaging, content, or campaigns; we scope
            it inside the engagement. Nothing informal. Nothing off the approved constraint.
          </p>
        </div>

        <figure className="mt-14 overflow-hidden rounded-sm border border-secondary/15 bg-depth-6">
          <img
            src="/execution-instruments.png"
            alt="Diagnostic evidence leads to one primary constraint, then scoped instruments including identity, content, customer work, and operating systems. Menu shopping paths are excluded."
            width={1536}
            height={1024}
            className="h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {instrumentGroups.map((group) => (
            <div
              key={group.title}
              className="border border-secondary/15 bg-secondary/5 p-6"
            >
              <h3 className="text-sm font-extrabold tracking-wide text-accent uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-6 text-secondary/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-6 text-secondary/60">
          Optional execution work is priced separately or explicitly included in the Scope
          of Work; never sold as a standalone package on this site.
        </p>

        <div className="mt-8 flex justify-center">
          <LinkButton text="Read the full service model" href="/work-with-us" intensity={3} />
        </div>
      </div>
    </section>
  )
}
