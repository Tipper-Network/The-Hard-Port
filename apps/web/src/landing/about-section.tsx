import LinkButton from '#/components/link_button'

export function AboutSection() {
  return (
    <section id="about" className="bg-depth-10 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          Who we are
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-heading text-3xl font-normal text-secondary md:text-4xl">
          A port is where ships go to rot. We&apos;re the order to leave it.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-secondary/70">
          We&apos;re the people in your corner who&apos;ll tell you the truth,
          do the work, and not stop until it moves. You focus on your craft.
          We handle the brand, the strategy, the campaigns &mdash; everything
          that turns attention into growth.
        </p>
        <LinkButton
          href="/about"
          variant="text"
          noMargin
          className="mt-6 inline-flex items-center gap-1 text-base"
        >
          The full story, if you need convincing
          <span aria-hidden="true">&gt;</span>
        </LinkButton>
      </div>
    </section>
  )
}
