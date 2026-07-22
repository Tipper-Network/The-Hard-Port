'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { setAccessToken } from '@/lib/auth-session'

function AuthCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      setAccessToken(token)
      router.replace('/review')
      return
    }

    router.replace('/auth/error?message=Missing%20access%20token')
  }, [token, router])

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
