'use client'

import { LazySection } from '@/components/landing/lazy-section'
import { FunnelSection } from '@/components/tracking/funnel-section'

import { LazySectionContent } from './section-loader'
import { LAZY_HOME_SECTIONS } from './sections.config'

export function HomeSections() {
  return (
    <>
      {LAZY_HOME_SECTIONS.map((section) => (
        <FunnelSection key={section.id} id={section.id}>
          <LazySection minHeight={section.minHeight ?? '24rem'}>
            <LazySectionContent id={section.id} />
          </LazySection>
        </FunnelSection>
      ))}
    </>
  )
}
