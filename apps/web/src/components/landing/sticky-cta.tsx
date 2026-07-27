'use client'

import LinkButton from '@/components/link-button'
import {
  STICKY_CTA_BY_SECTION,
  STICKY_CTA_SECTION_IDS,
  type HomeSectionId,
} from '@/landing/sections.config'
import { useActiveSection } from '@/hooks/use-active-section'

export function StickyCta() {
  const activeId = useActiveSection(STICKY_CTA_SECTION_IDS)
  const cta = activeId ? STICKY_CTA_BY_SECTION[activeId as HomeSectionId] : undefined

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
