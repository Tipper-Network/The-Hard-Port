import { authFetch } from '@/lib/api/client'
import type { ApplicationRecord, ApplicationSummary } from '@/lib/intake/pipeline'

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

export async function listApplications(): Promise<ListApplicationsResult> {
  const result = await authFetch<{ applications: ApplicationSummary[] }>('/intake/applications')
  if (!result.ok) return result
  return result as ListApplicationsResult
}

export async function getApplication(id: string): Promise<GetApplicationResult> {
  const result = await authFetch<{ application: ApplicationRecord }>(`/intake/applications/${id}`)
  if (!result.ok) return result
  return result as GetApplicationResult
}

export async function updateApplicationPipeline(
  id: string,
  payload: UpdatePipelinePayload,
): Promise<UpdatePipelineResult> {
  const result = await authFetch<{ application: ApplicationRecord }>(`/intake/applications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (!result.ok) return result
  return result as UpdatePipelineResult
}
