const projects = [
  {
    client: 'Harbor Co.',
    category: 'Brand launch',
    summary: 'Full rebrand and multi-channel launch for a coastal retail group.',
    tone: 'from-primary to-primary/80',
  },
  {
    client: 'Northline',
    category: 'Campaign',
    summary: 'National awareness push with digital-first creative and OOH.',
    tone: 'from-primary/80 to-primary/60',
  },
  {
    client: 'Signal Works',
    category: 'Content',
    summary: 'Always-on content system and performance creative for B2B SaaS.',
    tone: 'from-primary/60 to-primary',
  },
] as const

export function WorkSection() {
  return (
    <section id="work" className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              Selected work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
              Campaigns that stand out in crowded waters
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-button border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Start a project
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.client}
              className="group overflow-hidden rounded-lg bg-white shadow-[0_2px_2px_rgba(0,0,0,0.04)]"
            >
              <div
                className={`flex h-48 items-end bg-gradient-to-br ${project.tone} p-6`}
              >
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary">{project.client}</h3>
                <p className="mt-2 text-sm leading-6 text-primary/70">
                  {project.summary}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent transition-transform group-hover:translate-x-1">
                  View case study →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
