import { DistanceMeter } from '@/components/landing/distance-meter'
import { StickyCta } from '@/components/landing/sticky-cta'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

import { HomeSections } from './home-sections'
import { Hero } from './sections/hero-section'
import { LetterSection } from './sections/letter-section'

export function HomePage() {
  return (
    <>
    <div className="h-2 ">

      <DistanceMeter />
    </div>
      <SiteHeader />
      <main>
        <Hero />
        <LetterSection />
        <HomeSections />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  )
}
