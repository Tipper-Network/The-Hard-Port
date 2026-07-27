import { useQuery } from '@tanstack/react-query'

import { ApiRequestError } from '@/lib/api/errors'
import { getApplicationJourney, getFunnelSummary } from '@/lib/api/tracking'
import { queryKeys } from '@/lib/api/query-keys'

export function useFunnelSummary(days = 30, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.tracking.funnel(days),
    queryFn: async () => {
      const result = await getFunnelSummary(days)
      if (!result.ok) {
        throw new ApiRequestError(result.error, { unauthorized: result.unauthorized })
      }
      return result
    },
    enabled: options?.enabled ?? true,
  })
}

export function useApplicationJourney(applicationId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.tracking.journey(applicationId),
    queryFn: async () => {
      const result = await getApplicationJourney(applicationId)
      if (!result.ok) {
        throw new ApiRequestError(result.error, { unauthorized: result.unauthorized })
      }
      return result
    },
    enabled: (options?.enabled ?? true) && !!applicationId,
  })
}
