'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { TrackingConsentBanner } from '@/components/tracking/consent-banner'
import { hasTrackingConsent } from '@/lib/tracking/consent'
import {
  hasPendingEvents,
  isTrackingPath,
  requeueEvents,
  takePendingEvents,
  trackEvent,
  trackFormAbandon,
  trackFunnelDepth,
} from '@/lib/tracking/event-store'
import { flushVisitorEvents } from '@/lib/tracking/flush-events'
import { emitSessionStart } from '@/lib/tracking/session-start'
import { getVisitorId } from '@/lib/tracking/visitor-id'

const FLUSH_INTERVAL_MS = 15_000

async function flushNow(visitorId: string) {
  trackFunnelDepth(window.location.pathname)
  trackFormAbandon()

  if (!hasPendingEvents()) return

  const batch = takePendingEvents()
  const result = await flushVisitorEvents(visitorId, batch)
  if (!result.ok) {
    requeueEvents(batch)
  }
}

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)
  const [consentReady, setConsentReady] = useState(() => hasTrackingConsent())

  useEffect(() => {
    if (!consentReady || !isTrackingPath(pathname)) return

    emitSessionStart(pathname)

    if (lastPath.current === pathname) return
    lastPath.current = pathname

    const funnelStep =
      pathname === '/work-with-us'
        ? 'work_with_us'
        : pathname === '/business-levels'
          ? 'business_levels'
          : pathname === '/about'
            ? 'about'
            : pathname === '/apply'
              ? 'apply'
              : undefined

    trackEvent('page_view', { pathname, ...(funnelStep ? { funnelStep } : {}) })
  }, [pathname, consentReady])

  useEffect(() => {
    if (!consentReady || !isTrackingPath(pathname)) return

    const visitorId = getVisitorId()
    if (!visitorId) return

    const id = visitorId

    const interval = window.setInterval(() => {
      void flushNow(id)
    }, FLUSH_INTERVAL_MS)

    function onHide() {
      void flushNow(id)
    }

    window.addEventListener('pagehide', onHide)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') onHide()
    })

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('pagehide', onHide)
    }
  }, [pathname, consentReady])

  return (
    <>
      {children}
      {!consentReady ? <TrackingConsentBanner onChoice={() => setConsentReady(hasTrackingConsent())} /> : null}
    </>
  )
}
