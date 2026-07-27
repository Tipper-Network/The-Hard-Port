export { consentNeedsPrompt, getTrackingConsent, hasTrackingConsent, setTrackingConsent } from '@/lib/tracking/consent'
export {
  getDiscoveryPrefill,
  getDiscoveryVideoId,
  getEntryContext,
  getMaxRung,
  getSessionId,
  updateMaxRung,
} from '@/lib/tracking/session'
export { emitSessionStart } from '@/lib/tracking/session-start'
export { trackClick } from '@/lib/tracking/flush-events'
export { parsePhoneCountryCode, localeRegionHint } from '@/lib/tracking/phone-parse'
export {
  FORM_STEPS,
  FORM_STEP_FIELDS,
  isStepComplete,
  type FormStepId,
} from '@/lib/tracking/form-steps'
export {
  getVisitorIdentity,
  hasPendingEvents,
  identifyVisitor,
  isTrackingPath,
  markApplicationSubmitted,
  markApplicationViewed,
  requeueEvents,
  takePendingEvents,
  trackEvent,
  trackFieldStarted,
  trackFormAbandon,
  trackFormStepComplete,
  trackFormStepView,
  trackFunnelDepth,
  trackNavClick,
  trackScrollDepth,
  trackSectionView,
  trackStickyCtaClick,
  trackStickyCtaView,
} from '@/lib/tracking/event-store'
export { flushVisitorEvents } from '@/lib/tracking/flush-events'
export { getVisitorId } from '@/lib/tracking/visitor-id'
