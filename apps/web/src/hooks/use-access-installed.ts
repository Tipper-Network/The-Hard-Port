'use client'

import { useEffect, useState } from 'react'

export function useAccessInstalled(): boolean | undefined {
  const [installed, setInstalled] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    void fetch('/api/hp/status', { credentials: 'same-origin' })
      .then(async (res) => {
        if (!res.ok) return false
        const data = (await res.json()) as { catalog?: boolean }
        return Boolean(data.catalog)
      })
      .then((v) => {
        if (!cancelled) setInstalled(v)
      })
      .catch(() => {
        if (!cancelled) setInstalled(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return installed
}
