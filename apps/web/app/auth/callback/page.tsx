'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import LinkButton from '@/components/link-button'
import { useCompleteSignIn } from '@/hooks/api/use-auth'

function AuthCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { mutate, isPending, isError, error } = useCompleteSignIn()
  const started = useRef(false)

  useEffect(() => {
    if (!token) {
      router.replace('/auth/error?message=Missing%20access%20token')
      return
    }

    if (started.current) return
    started.current = true
    mutate(token)
  }, [token, router, mutate])

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-depth-9 px-6 text-center">
        <p className="text-alert">{error.message}</p>
        <LinkButton text="Back to sign in" href="/sign-in" intensity={1} />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-depth-9 px-6 text-white/70">
      {isPending ? 'Signing you in…' : 'Signing you in…'}
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
