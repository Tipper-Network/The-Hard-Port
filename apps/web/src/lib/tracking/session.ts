const SESSION_ID_KEY = 'thp_session_id'
const MAX_RUNG_KEY = 'thp_max_rung'
const ENTRY_CONTEXT_KEY = 'thp_entry_context'
const SESSION_STARTED_KEY = 'thp_session_started'

export type EntryContext = {
  pathname: string
  referrer: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  ref?: string
  video?: string
  locale: string
  timezone: string
  viewportWidth: number
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  const existing = window.sessionStorage.getItem(SESSION_ID_KEY)?.trim()
  if (existing) return existing

  const next =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  window.sessionStorage.setItem(SESSION_ID_KEY, next)
  return next
}

export function captureEntryContext(pathname: string): EntryContext {
  const params = new URLSearchParams(window.location.search)
  const context: EntryContext = {
    pathname,
    referrer: document.referrer || '',
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    utmContent: params.get('utm_content') ?? undefined,
    utmTerm: params.get('utm_term') ?? undefined,
    ref: params.get('ref') ?? undefined,
    video: params.get('video') ?? undefined,
    locale: navigator.language || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    viewportWidth: window.innerWidth,
  }

  window.sessionStorage.setItem(ENTRY_CONTEXT_KEY, JSON.stringify(context))
  return context
}

export function getEntryContext(): EntryContext | null {
  if (typeof window === 'undefined') return null
  const raw = window.sessionStorage.getItem(ENTRY_CONTEXT_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as EntryContext
  } catch {
    return null
  }
}

export function markSessionStarted() {
  window.sessionStorage.setItem(SESSION_STARTED_KEY, '1')
}

export function hasSessionStarted(): boolean {
  return window.sessionStorage.getItem(SESSION_STARTED_KEY) === '1'
}

export function updateMaxRung(rung: number) {
  const current = getMaxRung()
  if (rung > current) {
    window.sessionStorage.setItem(MAX_RUNG_KEY, String(rung))
  }
}

export function getMaxRung(): number {
  if (typeof window === 'undefined') return 0
  const raw = window.sessionStorage.getItem(MAX_RUNG_KEY)
  const parsed = raw ? Number.parseInt(raw, 10) : 0
  return Number.isFinite(parsed) ? parsed : 0
}

export function getDiscoveryPrefill(): string | null {
  const entry = getEntryContext()
  if (!entry) return null
  if (entry.ref === 'youtube') return 'YouTube'
  if (entry.utmSource) {
    const source = entry.utmSource.trim().toLowerCase()
    if (source.includes('google') || source.includes('bing') || source.includes('search')) {
      return 'Google / search'
    }
    if (
      source.includes('instagram') ||
      source.includes('facebook') ||
      source.includes('linkedin') ||
      source.includes('meta') ||
      source.includes('tiktok') ||
      source.includes('youtube')
    ) {
      return source.includes('youtube') ? 'YouTube' : 'Social media'
    }
  }
  return null
}

/** YouTube video ID from `?ref=youtube&video=` — for discoverySourceVideo field (P05). */
export function getDiscoveryVideoId(): string | null {
  const entry = getEntryContext()
  if (!entry || entry.ref !== 'youtube') return null
  return entry.video?.trim() || null
}
