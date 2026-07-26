import LinkButton from '@/components/link_button'

export function CapacitySection() {
  return (
    <section id="capacity" className="bg-depth-8 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          Capacity
        </p>
        <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
          One active client at a time.
        </h2>
        <p className="mt-6 text-base leading-7 text-secondary/70 md:text-lg">
          During our first field-validation cycle, THP accepts one active diagnostic or
          intervention client at a time. That is not scarcity theatre; it is how we keep
          the work honest while we prove the process in the field.
        </p>
        <p className="mt-4 text-base leading-7 text-secondary/70">
          If you are not selected, that is a decision; not a rejection letter padded
          with compliments.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton text="Engagement Readiness Application" href="/apply" intensity={3} />
        </div>
      </div>
    </section>
  )
}
