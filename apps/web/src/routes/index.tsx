import { createFileRoute } from '@tanstack/react-router'

import { AboutSection } from '#/landing/about-section'
import { BoostingSection } from '#/landing/boosting-section'
import { BrandingSection } from '#/landing/branding-section'
import { ContactSection } from '#/landing/contact-section'
import { FaqSection } from '#/landing/faq-section'
import { FreeSlotsSection } from '#/landing/free-slots-section'
import { GapSection } from '#/landing/gap-section'
import { Hero } from '#/landing/hero'
import { LetterSection } from '#/landing/letter-section'
import { PackagesSection } from '#/landing/packages-section'
import { ProcessSection } from '#/landing/process-section'
import { ProofSection } from '#/landing/proof-section'
import { StrategySection } from '#/landing/strategy-section'
import { SiteFooter } from '#/shared/site-footer'
import { SiteHeader } from '#/shared/site-header'
import { DistanceMeter } from '#/components/distance-meter'
import { StickyCta } from '#/components/sticky-cta'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <DistanceMeter />
      <SiteHeader />
      <main>
        <Hero />
        <LetterSection />
        <BoostingSection />
        <GapSection />
        <ProofSection />
        <ProcessSection />
        <BrandingSection />
        <StrategySection />
        <PackagesSection />
        <FreeSlotsSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  )
}
