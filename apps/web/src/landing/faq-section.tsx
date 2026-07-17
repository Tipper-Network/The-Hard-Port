import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Link } from '@tanstack/react-router'

const faqs = [
  {
    q: 'Why are you so direct?',
    a: 'We\u2019re honest because we care about your results. The answer you want to hear and the answer that actually grows your business aren\u2019t always the same one. We choose the second one, every time.',
  },
  {
    q: 'My business is doing fine, though.',
    a: '"Fine" is the polite word for "stuck." If fine was working the way you want it to, you wouldn\u2019t be here.',
  },
  {
    q: 'Can\u2019t I just boost my posts myself?',
    a: 'Sure. You\u2019ve been doing that. How\u2019s the queue of new customers looking? Boosting spends money. Campaigns make it. We covered this.',
    linkText: 'Scroll up',
    hash: 'boosting' as const,
    to: '/',
  },
  {
    q: 'Why do I have to pay if you offer free slots?',
    a: 'Because free slots are 2 a month and we pick them. Paying is what makes you actually do it \u2014 skin in the game changes everything.',
  },
  {
    q: 'What do I actually get?',
    a: 'Clarity, first. The map between where you are and where you want to be. Then the brand and the campaigns that close that gap. Direction, work, and results you can feel.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No. What we guarantee is the truth, the work done properly, and a partner who shows up all the way. We will not waste your money on vanity metrics. The rest is a partnership, not a magic trick.',
  },
  {
    q: 'This feels like a lot. Can I think about it?',
    a: 'You can think about it for another year, like the last one. Or you can decide. We don\u2019t work with maybes \u2014 that\u2019s not pressure, it\u2019s just what actually works.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-depth-11 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          You&apos;ve got questions. We&apos;ve got attitude.
        </p>
        <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
          The stuff you&apos;re too polite to ask
        </h2>

        <Accordion type="single" collapsible className="mt-10 border-t border-secondary/15">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              value={faq.q}
              className="border-b border-secondary/15"
            >
              <AccordionTrigger className="text-left text-base font-bold text-secondary hover:no-underline md:text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-secondary/70">
                {faq.a} {faq.linkText && <Link to={faq.to} hash={faq.hash}>{faq.linkText}</Link>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
