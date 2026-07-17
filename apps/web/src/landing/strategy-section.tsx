import { whatsappNumber } from '#/lib/brand'
import { rungPunchlineClass } from '#/lib/rung-weight'
import { cn } from '#/lib/utils'

const strategyInquiryHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Strategy inquiry: we need the map, not just more content —',
)}`

const strategyPillars = [
  {
    no: '01',
    title: 'Campaign Architecture',
    body: 'Not a content dump. A connected sequence with a goal at the end. Every post, every story, every piece of content knows why it exists.',
  },
  {
    no: '02',
    title: 'Growth Testing',
    body: 'We test what works and cut what doesn\'t. Every month builds on the last; strategy that compounds instead of resets.',
  },
  {
    no: '03',
    title: 'Competitor Intelligence',
    body: 'We know what they\'re doing so you don\'t waste time watching them. Your attention goes to moving forward, not looking sideways.',
  },
  {
    no: '04',
    title: 'Performance Review',
    body: 'Numbers aren\'t vanity if you use them. We do. Every month we close the loop; what worked, what didn\'t, what changes next.',
  },
]

export function StrategySection() {
  return (
    <section id="strategy" className="bg-depth-7 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Strategy
          </p>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl lg:text-[2.75rem]">
            A strategy is not a calendar.
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            Most content plans fail because they plan content, not outcomes. We
            build the system that makes content compound; month after month,
            not post after post.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {strategyPillars.map((pillar) => (
            <article
              key={pillar.no}
              className="flex flex-col border border-secondary/15 bg-secondary/5 p-7"
            >
              <span className="font-heading text-3xl font-normal text-accent">
                {pillar.no}
              </span>
              <h3 className="mt-4 text-lg font-extrabold tracking-wide text-secondary uppercase">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-secondary/70">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>

        <p className={cn('mx-auto mt-12 max-w-2xl text-center text-secondary', rungPunchlineClass('strategy'))}>
          You don&apos;t need more content. You need a reason for the content
          you already have.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-secondary/50">
          This is the standalone engine. Ocean already builds this into the
          retainer; this is the door for everyone else.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={strategyInquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-extrabold tracking-wide text-background uppercase transition-transform hover:-translate-y-0.5"
          >
            Get the roadmap priced
          </a>
        </div>
      </div>
    </section>
  )
}
