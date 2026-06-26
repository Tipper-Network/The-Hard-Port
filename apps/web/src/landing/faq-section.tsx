import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Link } from '@tanstack/react-router'

const faqs = [
  {
    q: 'Why are you so rude?',
    a: 'We\u2019re not rude. We\u2019re honest, and you\u2019re not used to it. Every other agency tells you what you want to hear so you\u2019ll sign. We tell you the truth so you\u2019ll actually grow. Pick which one you\u2019d rather pay for.',
  },
  {
    q: 'My business is doing fine, though.',
    a: 'That\u2019s literally the section above. "Fine" is the polite word for "stuck." If fine was working, you wouldn\u2019t be reading the FAQ of a media agency at 1am.',
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
    a: 'Because free slots are 2 a month and we pick them. If you\u2019re reading this expecting a discount, you\u2019re probably not one of the two. Free advice gets ignored anyway; paying is what makes you actually do it.',
  },
  {
    q: 'What do I actually get?',
    a: 'Clarity, first. The map between where you are and where you want to be. Then the brand and the campaigns that close that gap. Not 12 random posts a month that nobody asked for.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No, and run from anyone who does on day one. We guarantee we\u2019ll tell you the truth, do the work properly,show you how and teach you along the way. we willnot waste your money on vanity metrics. The rest is a partnership, not a magic trick.',
  },
  {
    q: 'This feels like a lot. Can I think about it?',
    a: 'You can think about it for another year, like the last one. Or you can decide. We don\u2019t work with maybes; that\u2019s not a sales tactic, it\u2019s just what works.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          You&apos;ve got questions. We&apos;ve got attitude.
        </p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-primary md:text-4xl">
          The stuff you&apos;re too polite to ask
        </h2>

        <Accordion type="single" collapsible className="mt-10 border-t border-primary/15">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              value={faq.q}
              className="border-b border-primary/15"
            >
              <AccordionTrigger className="text-left text-base font-bold text-primary hover:no-underline md:text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-primary/70">
                {faq.a} {faq.linkText && <Link to={faq.to} hash={faq.hash}>{faq.linkText}</Link>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
