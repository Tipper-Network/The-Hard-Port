import LinkButton from '#/components/link_button'
import { freeSlots } from '#/lib/brand'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-depth-12 px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="max-w-2xl font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-5xl">
          The only thing worse than sinking is staying still.
        </h2>
        <LinkButton text="Apply for The free slot" href="#apply" hash="apply" />
        <p className="mt-4 text-sm text-secondary/50">
          {freeSlots.perMonth} slots a month. We pick.
        </p>
      </div>
    </section>
  )
}
