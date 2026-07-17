'use client'

import { Link } from '@tanstack/react-router'

import { useActiveSection } from '#/lib/use-active-section'

/** Every id that exists as a landing section, in page order. */
const SECTION_IDS = [
  'letter',
  'boosting',
  'gap',
  'proof',
  'process',
  'branding',
  'strategy',
  'packages',
  'apply',
  'about',
  'faq',
  'contact',
] as const

/** Matches the escalation copy set in `02-conversion-funnel.mdc`. Hero has
 *  no entry here — the sticky CTA stays hidden until a visitor scrolls past
 *  it, so it never doubles up with Hero's own two CTAs. Contact has no
 *  entry either: Last Call keeps a single, uncontested CTA. */
const LABEL_BY_SECTION: Partial<Record<(typeof SECTION_IDS)[number], string>> = {
  letter: 'See the gap',
  boosting: 'See the gap',
  gap: 'See the gap',
  proof: "Show me what I'm doing wrong",
  process: "Show me what I'm doing wrong",
  branding: 'Prove us wrong',
  strategy: 'Prove us wrong',
  packages: 'Prove us wrong',
  apply: 'Stop being fine',
  about: 'Stop being fine',
  faq: 'Stop being fine',
}

export function StickyCta() {
  const activeId = useActiveSection(SECTION_IDS)
  const label = activeId ? LABEL_BY_SECTION[activeId as (typeof SECTION_IDS)[number]] : undefined

  if (!label) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:px-0 sm:pb-0">
      <Link
        to="/"
        hash="apply"
        className="inline-flex w-full items-center justify-center bg-accent px-6 py-3.5 text-sm font-extrabold tracking-wide text-background uppercase shadow-lg shadow-black/40 transition-transform hover:-translate-y-0.5 sm:w-auto"
      >
        {label}
      </Link>
    </div>
  )
}
