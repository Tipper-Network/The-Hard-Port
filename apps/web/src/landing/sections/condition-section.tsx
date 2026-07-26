import LinkButton from '@/components/link_button'

const symptoms = [
  'Customers exist, but delivery still runs on founder effort',
  'Activity without evidence of what actually works',
  'Reaction and hope instead of repeatable systems',
  'Growth talk with no path to stability',
]

export function ConditionSection() {
  return (
    <section id="condition" className="bg-depth-2 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              Who this is for
            </p>
            <LinkButton
              text="Discover business levels"
              href="/business-levels"
              variant="text"
              noMargin
              className="text-sm"
            />
          </div>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            Level 1. Established. Surviving. Not moving.
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            Online or online-dependent microbusinesses with a defined offer and paying
            customers; not pre-launch, not hobby-stage. You have motion. You do not have
            direction you can defend with evidence.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {symptoms.map((item) => (
            <div
              key={item}
              className="border border-secondary/15 bg-secondary/5 p-6 text-sm leading-6 text-secondary/75"
            >
              <span className="mr-2 font-bold text-accent">&middot;</span>
              {item}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-7 text-secondary/80">
          THP does not fix your Instagram. We examine whether your business can reach
          stability; and what constraint is actually in the way.
        </p>

        <div className="mt-8 flex justify-center">
          <LinkButton text="Read how THP works" href="/work-with-us" intensity={2} variant="ghost" />
        </div>
      </div>
    </section>
  )
}
