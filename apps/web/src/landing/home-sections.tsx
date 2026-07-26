'use client'

import { LazySection } from '@/components/lazy-section'

import { LazySectionContent } from './section-loader'
import { LAZY_HOME_SECTIONS } from './sections.config'

export function HomeSections() {
  return (
    <>
      {LAZY_HOME_SECTIONS.map((section) => (
        <LazySection key={section.id} minHeight={section.minHeight ?? '24rem'}>
          <LazySectionContent id={section.id} />
        </LazySection>
      ))}
    </>
  )
}
