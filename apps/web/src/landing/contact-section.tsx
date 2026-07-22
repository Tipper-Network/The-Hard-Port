import LinkButton from '@/components/link_button'

export function ContactSection() {
  return (
    <section id="contact" className="bg-depth-12 px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="max-w-2xl font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-5xl">
          The only thing worse than sinking is staying still.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-secondary/70">
          Read how THP works. If you still want in, apply honestly. We review whether
          qualification makes sense — not whether you flatter us.
        </p>
        <div className="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
          <LinkButton text="How THP works" href="/work-with-us" intensity={3} variant="ghost" />
          <LinkButton text="Apply" href="/apply" intensity={4} />
        </div>
        <p className="mt-8 text-xs italic text-secondary/30">
          This is not the only door we open.
        </p>
      </div>
    </section>
  )
}
