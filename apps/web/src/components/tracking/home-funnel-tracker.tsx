'use client'

import { useEffect, useRef } from 'react'

import { updateMaxRung } from '@/lib/tracking/session'
import { trackScrollDepth, trackSectionView } from '@/lib/tracking/event-store'

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const

export function HomeFunnelTracker() {
  const seenSections = useRef(new Set<string>())
  const seenScroll = useRef(new Set<number>())

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-funnel-section]')
    if (elements.length === 0) return

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const sectionId = el.dataset.funnelSection
          const rungRaw = el.dataset.funnelRung
          if (!sectionId || !rungRaw) continue
          if (seenSections.current.has(sectionId)) continue

          seenSections.current.add(sectionId)
          const rung = Number.parseInt(rungRaw, 10)
          if (Number.isFinite(rung)) {
            updateMaxRung(rung)
            trackSectionView(sectionId, rung)
          }
        }
      },
      { threshold: 0.35 },
    )

    elements.forEach((el) => sectionObserver.observe(el))

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !seenScroll.current.has(threshold)) {
          seenScroll.current.add(threshold)
          trackScrollDepth(threshold, window.location.pathname)
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      sectionObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
