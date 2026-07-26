'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

import type { LazyHomeSectionId } from './sections.config'

const LAZY_SECTIONS: Record<LazyHomeSectionId, ComponentType> = {
  condition: dynamic(() =>
    import('./sections/condition-section').then((m) => ({
      default: m.ConditionSection,
    })),
  ),
  misdiagnosis: dynamic(() =>
    import('./sections/misdiagnosis-section').then((m) => ({
      default: m.MisdiagnosisSection,
    })),
  ),
  gap: dynamic(() =>
    import('./sections/gap-section').then((m) => ({
      default: m.GapSection,
    })),
  ),
  'how-it-works': dynamic(() =>
    import('./sections/how-it-works-section').then((m) => ({
      default: m.HowItWorksSection,
    })),
  ),
  execution: dynamic(() =>
    import('./sections/execution-section').then((m) => ({
      default: m.ExecutionSection,
    })),
  ),
  proof: dynamic(() =>
    import('./sections/proof-section').then((m) => ({
      default: m.ProofSection,
    })),
  ),
  'not-promise': dynamic(() =>
    import('./sections/not-promise-section').then((m) => ({
      default: m.NotPromiseSection,
    })),
  ),
  capacity: dynamic(() =>
    import('./sections/capacity-section').then((m) => ({
      default: m.CapacitySection,
    })),
  ),
  faq: dynamic(() =>
    import('./sections/faq-section').then((m) => ({
      default: m.FaqSection,
    })),
  ),
  contact: dynamic(() =>
    import('@/forms/contact-section').then((m) => ({
      default: m.ContactSection,
    })),
  ),
}

type LazySectionContentProps = {
  id: LazyHomeSectionId
}

export function LazySectionContent({ id }: LazySectionContentProps) {
  const Section = LAZY_SECTIONS[id]
  return <Section />
}
