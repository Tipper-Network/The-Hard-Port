import { DistanceMeter } from '@/components/distance-meter'
import { StickyCta } from '@/components/sticky-cta'
import { Hero } from '@/landing/hero'
import { LetterSection } from '@/landing/letter-section'
import { LazyHomeSections } from '@/landing/lazy-home-sections'
import { SiteFooter } from '@/shared/site-footer'
import { SiteHeader } from '@/shared/site-header'

export default function HomePage() {
  return (
    <>
      <DistanceMeter />
      <SiteHeader />
      <main>
        <Hero />
        <LetterSection />
        <LazyHomeSections />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  )
}
