import { hasTrackingConsent } from '@/lib/tracking/consent'

const VISITOR_ID_KEY = 'thp_visitor_id'

function createVisitorId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

export function getVisitorId(): string | null {
  if (typeof window === 'undefined') return null
  if (!hasTrackingConsent()) return null

  const stored = window.localStorage.getItem(VISITOR_ID_KEY)?.trim()
  if (stored) return stored

  const next = createVisitorId()
  window.localStorage.setItem(VISITOR_ID_KEY, next)
  return next
}
