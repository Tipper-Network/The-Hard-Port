'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import {
  hasPendingEvents,
  isTrackingPath,
  requeueEvents,
  takePendingEvents,
  trackEvent,
} from '@/lib/tracking/event-store'
import { flushVisitorEvents } from '@/lib/tracking/flush-events'
import { getVisitorId } from '@/lib/tracking/visitor-id'

const FLUSH_INTERVAL_MS = 15_000

async function flushNow(visitorId: string) {
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

  useEffect(() => {
    if (!isTrackingPath(pathname)) return
    if (lastPath.current === pathname) return

    lastPath.current = pathname
    trackEvent('page_view', { pathname })
  }, [pathname])

  useEffect(() => {
    if (!isTrackingPath(pathname)) return

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
  }, [pathname])

  return children
}
