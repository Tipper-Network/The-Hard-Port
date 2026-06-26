import { createFileRoute } from '@tanstack/react-router'

import { AboutSection } from '#/landing/about-section'
import { BoostingSection } from '#/landing/boosting-section'
import { ContactSection } from '#/landing/contact-section'
import { FaqSection } from '#/landing/faq-section'
import { FreeSlotsSection } from '#/landing/free-slots-section'
import { GapSection } from '#/landing/gap-section'
import { Hero } from '#/landing/hero'
import { LetterSection } from '#/landing/letter-section'
import { PackagesSection } from '#/landing/packages-section'
import { ProcessSection } from '#/landing/process-section'
import { ProofSection } from '#/landing/proof-section'
import { SiteFooter } from '#/landing/site-footer'
import { SiteHeader } from '#/landing/site-header'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LetterSection />
        <BoostingSection />
        <GapSection />
        <ProofSection />
        <ProcessSection />
        <FreeSlotsSection />
        <PackagesSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
