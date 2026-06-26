import { createFileRoute } from '@tanstack/react-router'

import { AboutSection } from '#/landing/about-section'
import { ClientsSection } from '#/landing/clients-section'
import { ContactSection } from '#/landing/contact-section'
import { Hero } from '#/landing/hero'
import { PackagesSection } from '#/landing/packages-section'
import { ServicesSection } from '#/landing/services-section'
import { SiteFooter } from '#/landing/site-footer'
import { SiteHeader } from '#/landing/site-header'
import { WorkSection } from '#/landing/work-section'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/* <ClientsSection /> */}  
        <ServicesSection />
        <PackagesSection />
        {/* <WorkSection /> */}
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
