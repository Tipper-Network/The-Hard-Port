import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getAuthProviders, getCurrentUser, type AuthProviders } from '@/lib/api/auth'
import { ApiRequestError } from '@/lib/api/errors'
import { queryKeys } from '@/lib/api/query-keys'
import { clearAccessToken, getAccessToken, setAccessToken } from '@/lib/auth/session'

async function fetchCurrentUser() {
  const result = await getCurrentUser()
  if (!result.ok) {
    if (result.unauthorized) {
      clearAccessToken()
    }
    throw new ApiRequestError(result.error, { unauthorized: result.unauthorized })
  }
  return result.user
}

async function fetchAuthProviders() {
  const result = await getAuthProviders()
  if (!result.ok) {
    throw new ApiRequestError(result.error)
  }
  return result.providers
}

export function useAuthProviders(initialData?: AuthProviders) {
  return useQuery({
    queryKey: queryKeys.auth.providers(),
    queryFn: fetchAuthProviders,
    initialData,
    enabled: !initialData,
  })
}

export function useCurrentUser(options?: { enabled?: boolean }) {
  const hasToken = typeof window !== 'undefined' && !!getAccessToken()

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: fetchCurrentUser,
    enabled: options?.enabled ?? hasToken,
  })
}

export function useCompleteSignIn() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (accessToken: string) => {
      setAccessToken(accessToken)
      const user = await fetchCurrentUser()
      return user
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me(), user)
      router.replace('/review')
    },
    onError: () => {
      clearAccessToken()
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
    },
  })
}

export function useSignOut() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return () => {
    clearAccessToken()
    queryClient.removeQueries({ queryKey: queryKeys.auth.all })
    router.replace('/sign-in')
  }
}
