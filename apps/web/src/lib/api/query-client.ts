import { QueryClient } from '@tanstack/react-query'

import { isUnauthorizedError } from '@/lib/api/errors'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (isUnauthorizedError(error)) {
            return false
          }
          return failureCount < 1
        },
      },
    },
  })
}
