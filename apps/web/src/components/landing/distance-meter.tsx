'use client'

import { useEffect, useState } from 'react'

/** The nautical metaphor made literal: fills as the visitor scrolls, reading
 *  as distance travelled from port. Reaching the bottom should feel like
 *  being out at sea, past the point of easy return. */
const THRESHOLDS = [
  { min: 0, label: 'Leaving port' },
  { min: 0.15, label: 'Open water' },
  { min: 0.7, label: 'No drifting back' },
] as const

export function DistanceMeter() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    function measure() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const next = scrollable > 0 ? window.scrollY / scrollable : 0
      setProgress(Math.min(1, Math.max(0, next)))
    }

    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const label = [...THRESHOLDS].reverse().find((t) => progress >= t.min)?.label

  return (
    <div className="fixed inset-x-0 top-0 z-60 h-1 bg-white/10" aria-hidden="true">
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
      {label ? (
        <span className="absolute top-2 right-3 hidden text-[0.65rem] font-bold tracking-[0.14em] text-accent/80 uppercase sm:block">
          {label}
        </span>
      ) : null}
    </div>
  )
}
