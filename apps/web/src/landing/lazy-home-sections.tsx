'use client'

import dynamic from 'next/dynamic'

import { LazySection } from '@/components/lazy-section'

const ConditionSection = dynamic(() =>
  import('@/landing/condition-section').then((m) => ({ default: m.ConditionSection })),
)
const HowItWorksSection = dynamic(() =>
  import('@/landing/how-it-works-section').then((m) => ({ default: m.HowItWorksSection })),
)
const ProofSection = dynamic(() =>
  import('@/landing/proof-section').then((m) => ({ default: m.ProofSection })),
)
const NotPromiseSection = dynamic(() =>
  import('@/landing/not-promise-section').then((m) => ({ default: m.NotPromiseSection })),
)
const CapacitySection = dynamic(() =>
  import('@/landing/capacity-section').then((m) => ({ default: m.CapacitySection })),
)
const FaqSection = dynamic(() =>
  import('@/landing/faq-section').then((m) => ({ default: m.FaqSection })),
)
const ContactSection = dynamic(() =>
  import('@/landing/contact-section').then((m) => ({ default: m.ContactSection })),
)

export function LazyHomeSections() {
  return (
    <>
      <LazySection minHeight="28rem">
        <ConditionSection />
      </LazySection>
      <LazySection minHeight="32rem">
        <HowItWorksSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <ProofSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <NotPromiseSection />
      </LazySection>
      <LazySection minHeight="20rem">
        <CapacitySection />
      </LazySection>
      <LazySection minHeight="24rem">
        <FaqSection />
      </LazySection>
      <LazySection minHeight="20rem">
        <ContactSection />
      </LazySection>
    </>
  )
}
