export type VisitorEvent = {
  name: string
  path: string
  payload?: Record<string, unknown>
  occurredAt: string
}

type VisitorIdentity = {
  email?: string
  name?: string
}

let pending: VisitorEvent[] = []
let identity: VisitorIdentity = {}

export function trackEvent(name: string, payload?: Record<string, unknown>, path?: string) {
  if (typeof window === 'undefined') return

  pending.push({
    name,
    path: path ?? window.location.pathname,
    payload,
    occurredAt: new Date().toISOString(),
  })
}

export function identifyVisitor(next: VisitorIdentity) {
  identity = { ...identity, ...next }
}

export function getVisitorIdentity() {
  return { ...identity }
}

export function takePendingEvents(): VisitorEvent[] {
  if (pending.length === 0) return []
  const batch = pending
  pending = []
  return batch
}

export function requeueEvents(events: VisitorEvent[]) {
  pending = [...events, ...pending]
}

export function hasPendingEvents() {
  return pending.length > 0
}

export function isTrackingPath(pathname: string) {
  return !(
    pathname.startsWith('/review') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/auth/')
  )
}
