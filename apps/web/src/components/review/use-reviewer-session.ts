'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getCurrentUser, type AuthenticatedUser } from '@/lib/api/auth'
import { clearAccessToken, getAccessToken } from '@/lib/auth/session'

type ReviewerSessionState = {
  user: AuthenticatedUser | null
  loading: boolean
  error: string | null
  signOut: () => void
}

export function useReviewerSession(): ReviewerSessionState {
  const router = useRouter()
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function signOut() {
    clearAccessToken()
    setUser(null)
    router.replace('/sign-in')
  }

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/sign-in')
      return
    }

    let cancelled = false

    async function load() {
      const result = await getCurrentUser()
      if (cancelled) return

      if (!result.ok) {
        if (result.unauthorized) {
          clearAccessToken()
          router.replace('/sign-in')
          return
        }
        setError(result.error)
        setLoading(false)
        return
      }

      setUser(result.user)
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [router])

  return { user, loading, error, signOut }
}
