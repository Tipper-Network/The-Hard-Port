'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { isUnauthorizedError } from '@/lib/api/errors'
import { getAccessToken } from '@/lib/auth/session'
import { useCurrentUser, useSignOut } from '@/hooks/api/use-auth'

type ReviewerSessionState = {
  user: ReturnType<typeof useCurrentUser>['data'] | null
  loading: boolean
  error: string | null
  signOut: () => void
}

export function useReviewerSession(): ReviewerSessionState {
  const router = useRouter()
  const signOut = useSignOut()
  const hasToken = !!getAccessToken()

  useEffect(() => {
    if (!hasToken) {
      router.replace('/sign-in')
    }
  }, [hasToken, router])

  const { data: user, isPending, isError, error } = useCurrentUser({ enabled: hasToken })

  useEffect(() => {
    if (isError && isUnauthorizedError(error)) {
      signOut()
    }
  }, [isError, error, signOut])

  return {
    user: user ?? null,
    loading: hasToken && isPending,
    error: isError && !isUnauthorizedError(error) ? error.message : null,
    signOut,
  }
}
