'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import LinkButton from '@/components/link-button'
import { getAccessToken, getGoogleLoginUrl, getMetaLoginUrl } from '@/lib/auth/session'
import { useAuthProviders, useCurrentUser } from '@/hooks/api/use-auth'

export function SignInPanel() {
  const router = useRouter()
  const hasToken = !!getAccessToken()
  const { data: user, isSuccess: isSignedIn } = useCurrentUser({ enabled: hasToken })
  const {
    data: providers,
    isPending,
    isError,
    error,
  } = useAuthProviders()

  useEffect(() => {
    if (isSignedIn && user) {
      router.replace('/review')
    }
  }, [isSignedIn, user, router])

  if (hasToken && !isSignedIn) {
    return <p className="text-white/70">Checking session…</p>
  }

  if (isPending) {
    return <p className="text-white/70">Loading sign-in options…</p>
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{error.message}</p>
        <LinkButton text="Try again" href="/sign-in" intensity={1} />
      </div>
    )
  }

  if (!providers?.google && !providers?.meta) {
    return (
      <p className="text-white/70">
        No OAuth providers are configured on the API. Set Google or Meta credentials in the
        API environment, then reload this page.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {providers.google ? (
        <LinkButton
          text="Continue with Google"
          href={getGoogleLoginUrl()}
          external
          intensity={2}
          fullWidth
        />
      ) : null}
      {providers.meta ? (
        <LinkButton
          text="Continue with Meta"
          href={getMetaLoginUrl()}
          external
          intensity={2}
          variant={providers.google ? 'ghost' : 'solid'}
          fullWidth
        />
      ) : null}
    </div>
  )
}
