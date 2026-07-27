import { DistanceMeter } from '@/components/landing/distance-meter'
import { StickyCta } from '@/components/landing/sticky-cta'
import { FunnelSection } from '@/components/tracking/funnel-section'
import { HomeFunnelTracker } from '@/components/tracking/home-funnel-tracker'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

import { HomeSections } from './home-sections'
import { Hero } from './sections/hero-section'
import { LetterSection } from './sections/letter-section'

export function HomePage() {
  return (
    <>
      <HomeFunnelTracker />
      <div className="h-2 ">
        <DistanceMeter />
      </div>
      <SiteHeader />
      <main>
        <FunnelSection id="hero">
          <Hero />
        </FunnelSection>
        <FunnelSection id="letter">
          <LetterSection />
        </FunnelSection>
        <HomeSections />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  )
}
