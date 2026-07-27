import { getApiUrl } from '@/lib/auth/session'
import { getBatchMeta, getVisitorIdentity, type VisitorEvent } from '@/lib/tracking/event-store'

type FlushResult = { ok: true; stored: number } | { ok: false }

export async function flushVisitorEvents(
  visitorId: string,
  events: VisitorEvent[],
): Promise<FlushResult> {
  if (events.length === 0) return { ok: true, stored: 0 }

  const identity = getVisitorIdentity()
  const meta = getBatchMeta()

  try {
    const res = await fetch(`${getApiUrl()}/tracking/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId: meta.sessionId,
        email: identity.email,
        name: identity.name,
        locale: meta.locale,
        timezone: meta.timezone,
        phoneCountryCode: meta.phoneCountryCode,
        events: events.map((event) => ({
          name: event.name,
          path: event.path,
          payload: event.payload,
          occurredAt: event.occurredAt,
        })),
      }),
      keepalive: true,
    })

    if (!res.ok) {
      return { ok: false }
    }

    const body: unknown = await res.json().catch(() => null)
    if (body && typeof body === 'object' && 'ok' in body && body.ok === true) {
      return {
        ok: true,
        stored: 'stored' in body && typeof body.stored === 'number' ? body.stored : events.length,
      }
    }

    return { ok: false }
  } catch {
    return { ok: false }
  }
}

export function trackClick(label: string, href: string) {
  import('@/lib/tracking/event-store').then(({ trackEvent }) => {
    trackEvent('cta_click', { label, href })
  })
}
