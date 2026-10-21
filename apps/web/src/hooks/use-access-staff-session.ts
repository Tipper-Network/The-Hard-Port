'use client'

import { useEffect, useState } from 'react'

const STAFF_ROLES = new Set(['owner', 'admin', 'staff'])

export type AccessStaffSession = {
  role: string
  tenant: string
}

/**
 * Access console session (`hp_thp_session` via `/admin/thp/api/auth/session`).
 * Separate from intake OAuth used on `/review`.
 */
export function useAccessStaffSession(): AccessStaffSession | null | undefined {
  const [session, setSession] = useState<AccessStaffSession | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    void fetch('/admin/thp/api/auth/session', { credentials: 'same-origin' })
      .then(async (res) => {
        if (res.status === 401) return null
        const data = (await res.json()) as { ok?: boolean; role?: string; tenant?: string }
        if (!res.ok || !data.ok || !data.role || !STAFF_ROLES.has(data.role)) return null
        return { role: data.role, tenant: data.tenant ?? '' }
      })
      .then((s) => {
        if (!cancelled) setSession(s)
      })
      .catch(() => {
        if (!cancelled) setSession(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return session
}
