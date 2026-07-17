const brandingProblems = [
  'A logo someone made for a flat fee in 2018',
  'Colours chosen because they "felt right"',
  'A tagline nobody remembers — including you',
  'The same tone as every other business in your space',
  'No consistency between your Instagram and your shop front',
]

const brandingDeliverables = [
  'A messaging framework that sells before you open your mouth',
  'Visual identity built to compound across every touchpoint',
  'A tone of voice that sounds like you at your best — and can\'t be copied',
  'Brand consistency from a business card to a billboard',
  'Positioning that carves out space in a crowded market',
]

export function BrandingSection() {
  return (
    <section id="branding" className="bg-depth-6 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Branding
          </p>
          <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl lg:text-[2.75rem]">
            Your brand isn&apos;t broken. It&apos;s just saying nothing.
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary/70 md:text-lg">
            A brand isn&apos;t a logo. It&apos;s the first decision people make
            about you — before they read a word. Most businesses have a visual
            presence. Very few have a brand that does any work.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col border border-secondary/15 p-6 md:p-8">
            <p className="text-xs font-bold tracking-[0.18em] text-alert uppercase">
              What most brands look like
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {brandingProblems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-secondary/55"
                >
                  <span className="mt-0.5 shrink-0 text-alert">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col border border-accent p-6 shadow-[0_0_0_1px_var(--color-accent)] md:p-8">
            <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
              What we build
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {brandingDeliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-secondary/90"
                >
                  <span className="mt-0.5 shrink-0 text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-bold text-secondary">
          A brand that doesn&apos;t stand for something stands for nothing. And
          "nothing" doesn&apos;t convert.
        </p>
      </div>
    </section>
  )
}
