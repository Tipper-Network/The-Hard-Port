'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import {
  capabilityAvailability,
  capabilityBreakdown,
  packageCards,
  upgradeComparisonRows,
  type ComparisonCell,
  type PlanId,
} from '#/constants/packages-features'
import { cn } from '#/lib/utils'

const planIds = ['port', 'sea', 'ocean'] as const

const tabTriggerClass =
  'flex-1 px-3 py-2 text-white/60 hover:text-white data-active:bg-white/10 data-active:text-white after:bg-accent'

const tabListClass =
  'h-auto w-full max-w-2xl gap-0 border border-white/25 bg-white/5 p-1'

const accordionTriggerClass =
  'text-white hover:text-white/90 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:text-white/50'

const accordionShellClass = 'border border-white/25'

function formatPrice(price: number) {
  return price.toLocaleString()
}

function ComparisonCellContent({ value }: { value: ComparisonCell }) {
  if (typeof value === 'string') {
    return <span className="text-white/90">{value}</span>
  }

  return (
    <span className={cn('font-bold', value ? 'text-accent' : 'text-white/25')}>
      {value ? '✓' : '—'}
    </span>
  )
}

function planLabel(id: PlanId) {
  return packageCards.find((pkg) => pkg.id === id)?.name.replace('TO THE ', '') ?? id
}

function PlanAvailabilityRow({ availability }: { availability: Record<PlanId, boolean> }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 pb-2">
      {planIds.map((plan) => (
        <div key={plan} className="flex items-center gap-2 text-sm">
          <span className="text-white/50">{planLabel(plan)}</span>
          <ComparisonCellContent value={availability[plan]} />
        </div>
      ))}
    </div>
  )
}

function CapabilityTrigger({
  capability,
  availability,
}: {
  capability: string
  availability: Record<PlanId, boolean>
}) {
  return (
    <span className="flex flex-1 items-center justify-between gap-4 pr-2">
      <span>{capability}</span>
      <span className="hidden gap-4 text-xs font-normal sm:flex">
        {planIds.map((plan) => (
          <span key={plan} className="flex items-center gap-1">
            <span className="text-white/50">{planLabel(plan)}</span>
            <ComparisonCellContent value={availability[plan]} />
          </span>
        ))}
      </span>
    </span>
  )
}

export function PackagesSection() {
  const capabilities = Object.keys(capabilityBreakdown) as Array<
    keyof typeof capabilityBreakdown
  >

  return (
    <section id="packages" className="bg-primary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Priced clearly. Built around where you&apos;re going.
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
            Pick a lane. They&apos;re named after how brave you are.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/80">
            Or skip the whole thing and apply for a free slot. Two a month. We
            pick. Your call.
          </p>
        </header>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
          {packageCards.map((pkg) => (
            <article
              key={pkg.id}
              className={cn(
                'flex flex-col border px-5 py-6 text-white',
                pkg.featured
                  ? 'border-accent shadow-[0_0_0_1px_var(--color-accent)]'
                  : 'border-white/25',
              )}
            >
              <h3 className="text-center text-sm font-bold tracking-[0.12em]">
                {pkg.name}
                {pkg.featured ? (
                  <span className="ml-1 text-accent" aria-label="Recommended plan">
                    ★
                  </span>
                ) : null}
              </h3>

              {pkg.price !== 0 && (
                <p className="mt-4 text-center text-[0.65rem] font-bold tracking-[0.18em] text-white/40 uppercase">
                  Starting from
                </p>
              )}
              <p className={cn('text-center text-3xl font-extrabold tracking-tight', pkg.price !== 0 ? 'mt-1' : 'mt-4')}>
                ${pkg.price !== 0 ? formatPrice(pkg.price) : "???"}
                <span className="text-sm font-medium text-white/60">/mo</span>
              </p>

              <p className="mt-2 text-center text-sm text-white/70">{pkg.tagline}</p>

              <ul className="mt-5 flex-1 space-y-1.5 text-sm text-white/85">
                {pkg.includesLabel ? (
                  <li className="font-semibold text-white">{pkg.includesLabel}</li>
                ) : null}
                {pkg.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {bullet}
                  </li>
                ))}
                {pkg.upgradeBullets?.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="text-accent">+</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <a
                href={pkg.ctaLink}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                {pkg.cta}
              </a>
            </article>
          ))}
        </div>

        <Tabs defaultValue="compare" className="mt-16 w-full gap-6">
          <TabsList variant="line" className={cn(tabListClass, 'mx-auto')}>
            <TabsTrigger value="compare" className={tabTriggerClass}>
              Compare Features
            </TabsTrigger>
            <TabsTrigger value="details" className={tabTriggerClass}>
              Detailed Breakdown
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 — accordion per upgrade row */}
          <TabsContent value="compare" className="mt-6 text-white/75">
            <p className="mb-4 text-center text-sm text-white/60">
              Expand each feature to see how it differs across plans
            </p>
            <Accordion type="single" collapsible className={accordionShellClass}>
              {upgradeComparisonRows.map((row) => (
                <AccordionItem
                  key={row.label}
                  value={row.label}
                  className="border-white/10 px-4 last:border-b-0"
                >
                  <AccordionTrigger className={accordionTriggerClass}>
                    <span className="flex flex-1 items-center justify-between gap-4 pr-2">
                      <span>{row.label}</span>
                      <span className="hidden gap-3 text-xs font-normal sm:flex">
                        {planIds.map((plan) => (
                          <span key={plan} className="flex items-center gap-1">
                            <span className="text-white/50">{planLabel(plan)}</span>
                            <ComparisonCellContent value={row[plan]} />
                          </span>
                        ))}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pb-2">
                      {planIds.map((plan) => (
                        <div key={plan} className="flex items-center justify-between text-sm">
                          <span className="text-white/70">{planLabel(plan)}</span>
                          <ComparisonCellContent value={row[plan]} />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Tab 2 — accordion per capability (full detail bullets) */}
          <TabsContent value="details" className="mt-6 text-white/75">
            <p className="mb-4 text-center text-sm text-white/60">
              Expand any capability to see exactly what&apos;s included
            </p>
            <Accordion type="single" collapsible className={accordionShellClass}>
              {capabilities.map((capability) => {
                const details = capabilityBreakdown[capability]
                const availability = capabilityAvailability[capability]

                return (
                  <AccordionItem
                    key={capability}
                    value={capability}
                    className="border-white/10 px-4 last:border-b-0"
                  >
                    <AccordionTrigger className={accordionTriggerClass}>
                      <CapabilityTrigger capability={capability} availability={availability} />
                    </AccordionTrigger>
                    <AccordionContent>
                      <PlanAvailabilityRow availability={availability} />
                      <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                        {details.map((detail) => (
                          <li key={detail} className="flex gap-2 text-sm">
                            <span className="text-accent">✓</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
