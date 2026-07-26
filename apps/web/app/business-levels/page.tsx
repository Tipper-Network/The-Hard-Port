import type { Metadata } from 'next'

import LinkButton from '@/components/link_button'
import {
  corePrinciple,
  dimensions,
  levels,
  misleadingSignals,
  progression,
  provisionalLevels,
} from '@/content/business-levels'
import { SiteFooter } from '@/shared/site-footer'
import { SiteHeader } from '@/shared/site-header'

export const metadata: Metadata = {
  title: 'Business Levels | The Hard Port',
  description:
    'THP SMB maturity model: Levels 0 through 3, eight assessment dimensions, and classification logic from THP-SMB-LEVELS-001.',
}

export default function BusinessLevelsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Business structures
          </p>
          <h1 className="mt-4 font-heading text-4xl font-normal uppercase leading-tight text-secondary md:text-5xl">
            Levels 0 through 3
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary/75">
            THP classifies online and online-dependent microbusinesses by{' '}
            <strong className="text-secondary">operating maturity</strong>, not
            by appearance, revenue alone, followers, or what the founder calls
            the business.
          </p>
          <blockquote className="mt-6 border-l-2 border-accent/70 pl-4 text-base leading-7 text-secondary/80 italic">
            {corePrinciple}
          </blockquote>
        </div>

        <div className="mx-auto mt-14 max-w-3xl border border-secondary/15 bg-secondary/5 p-6 lg:p-8">
          <h2 className="font-heading text-lg font-normal uppercase text-secondary">
            How classification works
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary/70">
            <li>
              Your overall level is the highest stage whose required gate you
              have fully completed.
            </li>
            <li>
              You cannot advance because one area is strong. The{' '}
              <strong className="text-secondary">weakest mandatory gate</strong>{' '}
              controls your overall level, not your best visible month.
            </li>
            <li>
              You may be stronger on one dimension and weaker on another; THP
              records both overall level and per-dimension maturity.
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-8 max-w-3xl border border-secondary/15 bg-depth-10 p-6 lg:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
            Eight assessment dimensions
          </p>
          <p className="mt-2 text-sm text-secondary/55">
            Same eight dimensions at every level. What changes is the degree of
            maturity required to pass each gate.
          </p>
          <ul className="mt-5 space-y-4">
            {dimensions.map((dimension) => (
              <li key={dimension.id} className="text-sm leading-6">
                <span className="font-bold text-accent">{dimension.id}</span>
                <span className="font-semibold text-secondary">
                  {' '}
                  {dimension.name}
                </span>
                <span className="text-secondary/60">; {dimension.question}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-8 max-w-3xl border border-secondary/10 bg-depth-11 p-6 lg:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-secondary/45 uppercase">
            Misleading signals
          </p>
          <ul className="mt-4 space-y-2">
            {misleadingSignals.map((row) => (
              <li
                key={row.signal}
                className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-3"
              >
                <span className="text-secondary/75">{row.signal}</span>
                <span className="text-secondary/45 sm:before:content-['→_']">
                  does not prove {row.doesNotProve.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-8 max-w-3xl border border-secondary/15 bg-secondary/5 p-6 lg:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
            Progression
          </p>
          <ul className="mt-4 space-y-2">
            {progression.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-sm leading-6 text-secondary/70"
              >
                <span className="font-bold text-accent">&middot;</span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-8">
          {levels.map((level) => (
            <article
              key={level.id}
              id={level.id}
              className="border border-secondary/15 bg-depth-10 p-8 lg:p-10"
              style={{ scrollMarginTop: '5rem' }}
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-heading text-4xl text-accent/80">
                  {level.number}
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-normal uppercase text-secondary md:text-3xl">
                    {level.name}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-secondary/40">
                    {level.levelId}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold tracking-wide text-accent uppercase">
                {level.status}
              </p>

              <p className="mt-6 text-base leading-7 text-secondary/75">
                {level.definition}
              </p>

              {level.centralQuestion && (
                <blockquote className="mt-6 border-l-2 border-secondary/30 pl-4 text-sm leading-6 text-secondary/70 italic">
                  {level.centralQuestion}
                </blockquote>
              )}

              {level.entryGate && (
                <div className="mt-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-secondary/45 uppercase">
                    Entry gate
                  </p>
                  <ul className="mt-3 space-y-2">
                    {level.entryGate.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-6 text-secondary/70"
                      >
                        <span className="font-bold text-accent">&middot;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {level.excluded && (
                <div className="mt-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-secondary/45 uppercase">
                    Excluded from Level 1
                  </p>
                  <ul className="mt-3 space-y-2">
                    {level.excluded.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-6 text-secondary/70"
                      >
                        <span className="font-bold text-accent">&middot;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {level.primaryRisk && (
                <div className="mt-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-secondary/45 uppercase">
                    Primary risk
                  </p>
                  <p className="mt-3 text-sm leading-6 text-secondary/70">
                    {level.primaryRisk}
                  </p>
                </div>
              )}

              <p className="mt-6 border-l-2 border-accent/60 pl-4 text-sm leading-6 text-secondary/65">
                {level.thpNote}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl border border-secondary/10 bg-depth-11 p-8">
          <h2 className="font-heading text-xl font-normal uppercase text-secondary">
            Levels 4 through 7 (provisional)
          </h2>
          <p className="mt-4 text-sm leading-6 text-secondary/60">
            Detailed gates for Levels 4 through 7 are intentionally deferred
            until THP has field evidence from businesses progressing through
            Levels 1 to 3. Do not use these labels for client classification or
            service design until detailed gates exist.
          </p>
          <ul className="mt-6 space-y-4">
            {provisionalLevels.map((level) => (
              <li key={level.number} className="text-sm leading-6">
                <span className="font-bold text-accent">Level {level.number}</span>
                <span className="font-semibold text-secondary">
                  {' '}
                  {level.name}
                </span>
                <span className="text-secondary/60">; {level.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col flex-wrap justify-center gap-4 sm:flex-row">
          <LinkButton text="How THP works" href="/work-with-us" intensity={3} variant="ghost" />
          <LinkButton text="Apply" href="/apply" intensity={4} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
