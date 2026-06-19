import { createFileRoute } from '@tanstack/react-router'

import { AboutSection } from '#/components/landing/about-section'
import { ClientsSection } from '#/components/landing/clients-section'
import { ContactSection } from '#/components/landing/contact-section'
import { Hero } from '#/components/landing/hero'
import { ServicesSection } from '#/components/landing/services-section'
import { SiteFooter } from '#/components/landing/site-footer'
import { SiteHeader } from '#/components/landing/site-header'
import { WorkSection } from '#/components/landing/work-section'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/* <ClientsSection /> */}
        <ServicesSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
