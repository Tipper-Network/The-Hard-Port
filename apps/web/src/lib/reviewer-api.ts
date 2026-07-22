import { getAccessToken, getApiUrl } from '@/lib/auth-session'
import type { ApplicationRecord, ApplicationSummary } from '@/lib/pipeline-constants'

type ApiError = { ok: false; error: string; unauthorized?: boolean }
type ApiOk<T> = { ok: true } & T

export type ListApplicationsResult = ApiOk<{ applications: ApplicationSummary[] }> | ApiError

export type GetApplicationResult = ApiOk<{ application: ApplicationRecord }> | ApiError

export type UpdatePipelinePayload = Partial<{
  lifecycleStatus: string
  qualificationResult: string | null
  maturityClassification: string | null
  assignedReviewer: string | null
  missingEvidence: string | null
  nextAction: string | null
  paymentStatus: string | null
  activeCapacitySlot: boolean
  notes: string | null
  clientId: string | null
}>

export type UpdatePipelineResult = ApiOk<{ application: ApplicationRecord }> | ApiError

async function authFetch(path: string, init?: RequestInit) {
  const token = getAccessToken()
  if (!token) {
    return { ok: false as const, error: 'Not signed in', unauthorized: true }
  }

  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
      cache: 'no-store',
    })

    const body: unknown = await res.json().catch(() => null)

    if (res.status === 401) {
      return { ok: false as const, error: 'Session expired', unauthorized: true }
    }

    if (!res.ok) {
      const message =
        body &&
        typeof body === 'object' &&
        'message' in body &&
        typeof body.message === 'string'
          ? body.message
          : 'Request failed'
      return { ok: false as const, error: message }
    }

    if (body && typeof body === 'object' && 'ok' in body && body.ok === true) {
      return body as ApiOk<Record<string, unknown>>
    }

    return { ok: false as const, error: 'Unexpected response from API' }
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : 'Request failed',
    }
  }
}

export async function listApplications(): Promise<ListApplicationsResult> {
  const result = await authFetch('/intake/applications')
  if (!result.ok) return result
  return result as ListApplicationsResult
}

export async function getApplication(id: string): Promise<GetApplicationResult> {
  const result = await authFetch(`/intake/applications/${id}`)
  if (!result.ok) return result
  return result as GetApplicationResult
}

export async function updateApplicationPipeline(
  id: string,
  payload: UpdatePipelinePayload,
): Promise<UpdatePipelineResult> {
  const result = await authFetch(`/intake/applications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (!result.ok) return result
  return result as UpdatePipelineResult
}
