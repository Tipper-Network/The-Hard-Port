'use client'

import { useState } from 'react'

import Link from 'next/link'

import { consentNeedsPrompt, setTrackingConsent } from '@/lib/tracking/consent'
import { Button } from '../ui/button'

type TrackingConsentBannerProps = {
  onChoice: () => void
}

export function TrackingConsentBanner({ onChoice }: TrackingConsentBannerProps) {
  const [visible, setVisible] = useState(() => consentNeedsPrompt())

  if (!visible) return null

  function choose(accepted: boolean) {
    setTrackingConsent(accepted ? 'accepted' : 'rejected')
    setVisible(false)
    onChoice()
  }

  return (
    <div
      role="dialog"
      aria-label="Usage logging preference"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-depth-9/95 px-6 py-5 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-hero flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-white/80">
          We log anonymous site usage; pages, scroll depth, where people drop off. So we can constanty adjust
          the funnel. No ads. No third-party trackers.{' '}
          <Link href="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">
            Privacy
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            onClick={() => choose(false)}
          >
            Decline
          </Button>
          <Button onClick={() => choose(true)}>Accept</Button>
        </div>
      </div>
    </div>
  )
}
