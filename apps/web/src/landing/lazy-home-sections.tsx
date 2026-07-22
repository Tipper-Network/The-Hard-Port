'use client'

import dynamic from 'next/dynamic'

import { LazySection } from '@/components/lazy-section'

const BoostingSection = dynamic(() =>
  import('@/landing/boosting-section').then((m) => ({ default: m.BoostingSection })),
)
const GapSection = dynamic(() =>
  import('@/landing/gap-section').then((m) => ({ default: m.GapSection })),
)
const ProofSection = dynamic(() =>
  import('@/landing/proof-section').then((m) => ({ default: m.ProofSection })),
)
const ProcessSection = dynamic(() =>
  import('@/landing/process-section').then((m) => ({ default: m.ProcessSection })),
)
const BrandingSection = dynamic(() =>
  import('@/landing/branding-section').then((m) => ({ default: m.BrandingSection })),
)
const StrategySection = dynamic(() =>
  import('@/landing/strategy-section').then((m) => ({ default: m.StrategySection })),
)
const PackagesSection = dynamic(() =>
  import('@/landing/packages-section').then((m) => ({ default: m.PackagesSection })),
)
const FreeSlotsSection = dynamic(() =>
  import('@/landing/free-slots-section').then((m) => ({ default: m.FreeSlotsSection })),
)
const AboutSection = dynamic(() =>
  import('@/landing/about-section').then((m) => ({ default: m.AboutSection })),
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
        <BoostingSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <GapSection />
      </LazySection>
      <LazySection minHeight="20rem">
        <ProofSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <ProcessSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <BrandingSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <StrategySection />
      </LazySection>
      <LazySection minHeight="32rem">
        <PackagesSection />
      </LazySection>
      <LazySection minHeight="20rem">
        <FreeSlotsSection />
      </LazySection>
      <LazySection minHeight="24rem">
        <AboutSection />
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
