import LinkButton from '@/components/link_button'

const steps = [
  {
    no: '01',
    title: 'Application',
    body: 'You describe your business honestly. No pitch deck cosplay.',
  },
  {
    no: '02',
    title: 'Qualification',
    body: 'We decide whether a diagnostic is appropriate — not every applicant gets one.',
  },
  {
    no: '03',
    title: 'Business Reality Diagnostic',
    body: 'Paid, fixed-scope, evidence-based. Not a marketing audit.',
  },
  {
    no: '04',
    title: 'Findings',
    body: 'What the evidence supports. What it does not. What you should not do yet.',
  },
  {
    no: '05',
    title: 'Intervention',
    body: 'Optional, separate agreement — Level 1-to-Level 2 stability work when warranted.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-depth-4 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            The ladder
          </p>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
            One rung at a time. No skipping.
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            Discovery and application are free. The diagnostic is a paid professional
            service. Applying does not guarantee acceptance.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <article
              key={step.no}
              className="flex flex-col border border-secondary/15 bg-secondary/5 p-6"
            >
              <span className="font-heading text-3xl font-normal text-accent">{step.no}</span>
              <h3 className="mt-4 text-sm font-extrabold tracking-wide text-secondary uppercase">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-secondary/70">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <LinkButton text="Full service explanation" href="/work-with-us" intensity={3} />
        </div>
      </div>
    </section>
  )
}
