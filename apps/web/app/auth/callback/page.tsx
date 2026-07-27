'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import LinkButton from '@/components/link-button'
import { getCurrentUser } from '@/lib/api/auth'
import { clearAccessToken, setAccessToken } from '@/lib/auth/session'

function AuthCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      router.replace('/auth/error?message=Missing%20access%20token')
      return
    }

    const accessToken = token
    let cancelled = false

    async function finishSignIn() {
      setAccessToken(accessToken)

      const result = await getCurrentUser()
      if (cancelled) return

      if (!result.ok) {
        clearAccessToken()
        setError(result.error)
        return
      }

      router.replace('/review')
    }

    void finishSignIn()
    return () => {
      cancelled = true
    }
  }, [token, router])

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-depth-9 px-6 text-center">
        <p className="text-alert">{error}</p>
        <LinkButton text="Back to sign in" href="/sign-in" intensity={1} />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-depth-9 px-6 text-white/70">
      Signing you in…
    </main>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-depth-9 px-6 text-white/70">
          Signing you in…
        </main>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  )
}
