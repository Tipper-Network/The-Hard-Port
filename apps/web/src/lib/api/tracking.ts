import { authFetch } from '@/lib/api/client'

type ApiError = { ok: false; error: string; unauthorized?: boolean }

export type FunnelSummary = {
  periodDays: number
  totals: {
    sessions: number
    pageViews: number
    applyViews: number
    applySubmits: number
    formAbandons: number
    ctaClicks: number
  }
  conversion: {
    applyOpenRate: number | null
    sessionToApply: number | null
  }
  sectionReach: Array<{ sectionId: string; rung: number; views: number }>
  formSteps: Array<{ step: string; views: number; completes: number; abandons: number }>
  topEvents: Array<{ eventName: string; count: number }>
}

export type ApplicantJourney = {
  applicationId: string
  userId: string | null
  visitorId: string | null
  profile: {
    locale: string | null
    timezone: string | null
    inferredCountry: string | null
    phoneCountryCode: string | null
  } | null
  summary: {
    eventCount: number
    maxRung: number
    lastFormStep: string | null
    submitted: boolean
    abandoned: boolean
  }
  events: Array<{
    id: string
    eventName: string
    path: string | null
    payload: Record<string, unknown>
    occurredAt: string
  }>
}

export async function getFunnelSummary(days = 30) {
  const result = await authFetch<FunnelSummary>(`/tracking/funnel/summary?days=${days}`)
  return result
}

export async function getApplicationJourney(applicationId: string) {
  const result = await authFetch<ApplicantJourney>(
    `/tracking/applications/${applicationId}/journey`,
  )
  return result
}

export type FunnelSummaryResult =
  | ({ ok: true } & FunnelSummary)
  | ApiError

export type ApplicationJourneyResult =
  | ({ ok: true } & ApplicantJourney)
  | ApiError
