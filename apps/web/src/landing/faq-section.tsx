import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import LinkButton from '@/components/link_button'

const faqs = [
  {
    q: 'Why are you so direct?',
    a: 'The answer you want to hear and the answer that actually moves your business are not always the same one. We pick the second.',
  },
  {
    q: 'My business is doing fine, though.',
    a: '"Fine" is the polite word for stuck. If fine was working the way you want it to, you would not be here.',
  },
  {
    q: 'Is this a marketing audit?',
    a: 'No. A marketing audit reviews ads and content. The Business Reality Diagnostic reviews business condition across eight dimensions, identifies the primary constraint to stability, and is valuable even if you do not continue.',
  },
  {
    q: 'What does applying cost?',
    a: 'Discovery and application are free. Qualification review is free during our first field-validation cycle. The diagnostic is a paid, fixed-scope professional engagement.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No. We promise a disciplined evidence-based process, honest interpretation, and clear decisions. We do not promise sales, profit, virality, or that every client reaches Level 2.',
  },
  {
    q: 'What if I am not accepted?',
    a: 'Then THP is not the right move for you right now. That is a professional judgment, not a character assessment.',
  },
  {
    q: 'Can I think about it?',
    a: 'You can think about it for another year, like the last one. Or you can decide. We do not work with maybes.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-depth-10 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          Objections
        </p>
        <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
          The stuff you are too polite to ask
        </h2>

        <Accordion type="single" collapsible className="mt-10 border-t border-secondary/15">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              value={faq.q}
              className="border-b border-secondary/15"
            >
              <AccordionTrigger className="text-left text-base font-bold text-secondary hover:no-underline md:text-lg **:data-[slot=accordion-trigger-icon]:size-5! **:data-[slot=accordion-trigger-icon]:text-accent!">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-secondary/70">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex justify-center">
          <LinkButton text="Read the full picture" href="/work-with-us" variant="text" noMargin />
        </div>
      </div>
    </section>
  )
}
