'use client'

import LinkButton from '@/components/link_button'
import { useActiveSection } from '@/lib/use-active-section'

const SECTION_IDS = [
  'letter',
  'condition',
  'how-it-works',
  'proof',
  'not-promise',
  'capacity',
  'faq',
  'contact',
] as const

const LABEL_BY_SECTION: Partial<
  Record<(typeof SECTION_IDS)[number], { text: string; href: string; hash?: string }>
> = {
  letter: { text: 'See how it works', href: '/work-with-us' },
  condition: { text: 'See how it works', href: '/work-with-us' },
  'how-it-works': { text: 'Read the full picture', href: '/work-with-us' },
  proof: { text: 'Read the full picture', href: '/work-with-us' },
  'not-promise': { text: 'Apply', href: '/apply' },
  capacity: { text: 'Apply', href: '/apply' },
  faq: { text: 'Apply', href: '/apply' },
}

export function StickyCta() {
  const activeId = useActiveSection(SECTION_IDS)
  const cta = activeId ? LABEL_BY_SECTION[activeId as (typeof SECTION_IDS)[number]] : undefined

  if (!cta) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:px-0 sm:pb-0">
      <LinkButton
        text={cta.text}
        href={cta.href}
        hash={cta.hash}
        intensity={1}
        noMargin
        className="inline-flex w-full items-center justify-center bg-accent px-6 py-3.5 text-sm font-extrabold tracking-wide text-background uppercase shadow-lg shadow-black/40 transition-transform hover:-translate-y-0.5 sm:w-auto"
      />
    </div>
  )
}
