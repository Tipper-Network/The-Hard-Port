import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { ApiRequestError } from '@/lib/api/errors'
import {
  getApplication,
  listApplications,
  updateApplicationPipeline,
  type UpdatePipelinePayload,
} from '@/lib/api/review'
import { queryKeys } from '@/lib/api/query-keys'
import type { ApplicationRecord, ApplicationSummary } from '@/lib/intake/pipeline'

async function fetchApplications() {
  const result = await listApplications()
  if (!result.ok) {
    throw new ApiRequestError(result.error, { unauthorized: result.unauthorized })
  }
  return result.applications
}

async function fetchApplication(id: string) {
  const result = await getApplication(id)
  if (!result.ok) {
    throw new ApiRequestError(result.error, { unauthorized: result.unauthorized })
  }
  return result.application
}

export function useApplications(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.applications.lists(),
    queryFn: fetchApplications,
    enabled: options?.enabled ?? true,
  })
}

export function useApplication(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.applications.detail(id),
    queryFn: () => fetchApplication(id),
    enabled: options?.enabled ?? !!id,
  })
}

export function useUpdateApplicationPipeline(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdatePipelinePayload) => {
      const result = await updateApplicationPipeline(id, payload)
      if (!result.ok) {
        throw new ApiRequestError(result.error, { unauthorized: result.unauthorized })
      }
      return result.application
    },
    onSuccess: (application) => {
      queryClient.setQueryData<ApplicationRecord>(
        queryKeys.applications.detail(id),
        application,
      )
      queryClient.setQueryData<ApplicationSummary[]>(queryKeys.applications.lists(), (current) =>
        current?.map((item) =>
          item.id === application.id
            ? {
                ...item,
                lifecycleStatus: application.lifecycleStatus,
                qualificationResult: application.qualificationResult,
                nextAction: application.nextAction,
                activeCapacitySlot: application.activeCapacitySlot,
                assignedReviewer: application.assignedReviewer,
                clientId: application.clientId,
              }
            : item,
        ),
      )
    },
  })
}
