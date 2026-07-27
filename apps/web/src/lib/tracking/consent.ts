export type TrackingConsent = 'accepted' | 'rejected'

const CONSENT_KEY = 'thp_tracking_consent'

export function getTrackingConsent(): TrackingConsent | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(CONSENT_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

export function setTrackingConsent(choice: TrackingConsent) {
  window.localStorage.setItem(CONSENT_KEY, choice)
}

export function hasTrackingConsent(): boolean {
  return getTrackingConsent() === 'accepted'
}

export function consentNeedsPrompt(): boolean {
  return getTrackingConsent() === null
}
