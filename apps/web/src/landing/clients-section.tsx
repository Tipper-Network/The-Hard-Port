const clients = [
  'Harbor Co.',
  'Northline',
  'Signal Works',
  'Bluecurrent',
  'Waypoint',
  'Drift Media',
] as const

export function ClientsSection() {
  return (
    <section className="border-b border-primary/5 bg-white px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-hero">
        <p className="text-center text-xs font-semibold tracking-[0.25em] text-primary/40 uppercase">
          Trusted by teams at
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clients.map((client) => (
            <span
              key={client}
              className="text-sm font-bold tracking-wide text-primary/35 uppercase"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
