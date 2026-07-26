import { DistanceMeter } from '@/components/distance-meter'
import { StickyCta } from '@/components/sticky-cta'
import { SiteFooter } from '@/shared/site-footer'
import { SiteHeader } from '@/shared/site-header'

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
