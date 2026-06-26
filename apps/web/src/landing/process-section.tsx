const steps = [
  {
    no: '01',
    title: 'You Decide',
    body: 'Not "maybe." Not "let me think about it for six months." You decide you\u2019re actually done being fine. Tire-kickers can show themselves out.',
  },
  {
    no: '02',
    title: 'You Resolve',
    body: 'You put skin in the game. We don\u2019t do "let\u2019s just test the waters." Half-in is the same as out — it\u2019s why your last three plans died.',
  },
  {
    no: '03',
    title: 'We bring the clarity',
    body: 'The map between where you are and where you want to be. The brand, the campaign, the plan. You sail. We will be your crew',
  },
  {
    no: '04',
    title: 'Then You Commit',
    body: 'And yes, we charge. Free advice gets ignored; we\u2019ve literally watched it happen. You pay so it counts, so it gets done, so it works.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            How this actually works
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-primary md:text-4xl lg:text-[2.75rem]">
            We don&apos;t work with maybes.
          </h2>
          <p className="mt-5 text-base leading-7 text-primary/70 md:text-lg">
            This isn&apos;t a vending machine. There&apos;s a reason it goes in
            this exact order — and skipping a step is why nothing&apos;s changed
            for you yet.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.no}
              className="flex flex-col border border-primary/15 bg-white p-7"
            >
              <span className="text-3xl font-extrabold text-accent">{step.no}</span>
              <h3 className="mt-4 text-lg font-extrabold tracking-wide text-primary uppercase">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-primary/70">{step.body}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-bold text-primary">
          You don&apos;t pay us for time. You pay us so you finally do the thing
          you keep saying you&apos;ll do.
        </p>
      </div>
    </section>
  )
}
