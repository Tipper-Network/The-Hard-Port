'use client'

import { useState } from 'react'

import Link from 'next/link'

import { consentNeedsPrompt, setTrackingConsent } from '@/lib/tracking/consent'

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
          We log anonymous site usage — pages, scroll depth, where people drop off — so we can fix
          the funnel. No ads. No third-party trackers.{' '}
          <Link href="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">
            Privacy
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose(false)}
            className="border border-white/30 px-4 py-2 text-sm font-semibold text-white/80 uppercase transition-colors hover:border-white/60"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="bg-accent px-4 py-2 text-sm font-extrabold text-background uppercase transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
