'use client'

import { ProductUnlockWidget } from '@psyferblock/access/widgets'
import { useEffect, useState } from 'react'

import { THP_CATALOG_PATH } from '@/lib/access-public-paths'
import { useAccessInstalled } from '@/hooks/use-access-installed'

const DISMISS_KEY = 'hp_social_floater_dismissed'

export function SocialKeywordFloater() {
  const installed = useAccessInstalled()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  if (installed !== true || dismissed) return null

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
    setDismissed(true)
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-20 z-[45] flex justify-start px-4 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:px-0"
      aria-live="polite"
    >
      <div className="pointer-events-auto w-full max-w-sm">
        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded border border-accent/40 bg-depth-9/95 px-4 py-2.5 text-left text-sm font-semibold uppercase tracking-wide text-secondary shadow-lg shadow-black/30 backdrop-blur-sm hover:border-accent hover:text-accent"
          >
            From a video?
            <span className="mt-0.5 block text-xs font-normal normal-case tracking-normal text-secondary/70">
              Enter the word from the drop
            </span>
          </button>
        ) : (
          <div className="relative overflow-hidden rounded border border-accent/30 bg-depth-9 shadow-xl shadow-black/40">
            <div className="flex items-center justify-end gap-2 border-b border-white/10 px-3 py-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-wide text-secondary/60 hover:text-secondary"
              >
                Minimize
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="text-xs uppercase tracking-wide text-secondary/60 hover:text-accent"
                aria-label="Dismiss for this visit"
              >
                Close
              </button>
            </div>
            <div className="hp-social-floater-widget p-3 sm:p-4">
              <ProductUnlockWidget
                productPathPrefix={THP_CATALOG_PATH}
                title="Coming from a video?"
                lede="Enter the word we told you to comment. It routes to the right guide."
                className="!border-0 !bg-transparent !p-0 !shadow-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
