import { hasTrackingConsent } from '@/lib/tracking/consent'
import type { FormStepId } from '@/lib/tracking/form-steps'
import { getEntryContext, getMaxRung, getSessionId } from '@/lib/tracking/session'

export type VisitorEvent = {
  name: string
  path: string
  payload?: Record<string, unknown>
  occurredAt: string
}

export type VisitorIdentity = {
  email?: string
  name?: string
  locale?: string
  timezone?: string
  phoneCountryCode?: string
}

let pending: VisitorEvent[] = []
let identity: VisitorIdentity = {}

let applicationViewed = false
let applicationSubmitted = false
let lastFormStep: FormStepId | null = null
const formStepsViewed = new Set<FormStepId>()
const formStepsCompleted = new Set<FormStepId>()
const fieldsStarted = new Set<string>()

export function trackEvent(name: string, payload?: Record<string, unknown>, path?: string) {
  if (typeof window === 'undefined') return
  if (!hasTrackingConsent()) return

  const sessionId = getSessionId()
  const entry = getEntryContext()

  pending.push({
    name,
    path: path ?? window.location.pathname,
    payload: {
      sessionId,
      ...(entry?.locale ? { locale: entry.locale } : {}),
      ...(entry?.timezone ? { timezone: entry.timezone } : {}),
      ...(getMaxRung() > 0 ? { maxRungFromHome: getMaxRung() } : {}),
      ...payload,
    },
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

export function markApplicationViewed() {
  applicationViewed = true
}

export function markApplicationSubmitted() {
  applicationSubmitted = true
}

export function hasApplicationViewed() {
  return applicationViewed
}

export function hasApplicationSubmitted() {
  return applicationSubmitted
}

export function trackFormStepView(step: FormStepId) {
  if (formStepsViewed.has(step)) return
  formStepsViewed.add(step)
  lastFormStep = step
  trackEvent('form_step_view', { step })
}

export function trackFormStepComplete(step: FormStepId) {
  if (formStepsCompleted.has(step)) return
  formStepsCompleted.add(step)
  trackEvent('form_step_complete', { step })
}

export function trackFieldStarted(field: string) {
  if (fieldsStarted.has(field)) return
  fieldsStarted.add(field)
}

export function trackFormAbandon() {
  if (!applicationViewed || applicationSubmitted) return
  trackEvent('form_abandon', {
    lastStep: lastFormStep,
    fieldsStarted: [...fieldsStarted],
  })
}

export function trackFunnelDepth(pathname: string) {
  const maxRung = getMaxRung()
  if (maxRung <= 0) return
  trackEvent('funnel_depth', { maxRung, pathname })
}

export function trackSectionView(sectionId: string, rung: number) {
  trackEvent('section_view', { sectionId, rung })
}

export function trackScrollDepth(pct: number, pathname: string) {
  trackEvent('scroll_depth', { pct, pathname })
}

export function trackNavClick(label: string, href: string) {
  trackEvent('nav_click', { label, href })
}

export function trackStickyCtaView(sectionId: string, rung: number, label: string) {
  trackEvent('sticky_cta_view', { sectionId, rung, label })
}

export function trackStickyCtaClick(sectionId: string, rung: number, label: string, href: string) {
  trackEvent('sticky_cta_click', { sectionId, rung, label, href })
}

export function getBatchMeta() {
  const entry = getEntryContext()
  return {
    sessionId: getSessionId(),
    locale: identity.locale ?? entry?.locale,
    timezone: identity.timezone ?? entry?.timezone,
    phoneCountryCode: identity.phoneCountryCode,
  }
}
