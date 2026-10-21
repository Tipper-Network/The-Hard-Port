'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import LinkButton from '@/components/link-button'
import { queryKeys } from '@/lib/api/query-keys'
import { clearAccessToken, getAccessToken, getGoogleLoginUrl, getMetaLoginUrl } from '@/lib/auth/session'
import { useAuthProviders, useCurrentUser } from '@/hooks/api/use-auth'

function providerErrorMessage(message: string) {
  if (message === 'Failed to fetch' || message.includes('NetworkError')) {
    return 'Intake API is not reachable. Start it with pnpm dev:api (or pnpm dev) on port 3001, then try again.'
  }
  return message
}

export function SignInPanel() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [tokenPresent, setTokenPresent] = useState(false)

  useEffect(() => {
    setTokenPresent(!!getAccessToken())
  }, [])

  const hasToken = tokenPresent
  const {
    data: user,
    isPending: sessionPending,
    isSuccess: sessionValid,
    isError: sessionError,
  } = useCurrentUser({ enabled: hasToken })
  const {
    data: providers,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useAuthProviders()

  useEffect(() => {
    if (!hasToken) {
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
      return
    }

    if (sessionError) {
      clearAccessToken()
      setTokenPresent(false)
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
      return
    }

    if (sessionValid && user) {
      router.replace('/review')
    }
  }, [hasToken, sessionValid, sessionError, user, router, queryClient])

  if (hasToken && sessionPending) {
    return <p className="text-white/70">Checking session…</p>
  }

  if (isPending && !isError) {
    return <p className="text-white/70">Loading sign-in options…</p>
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{providerErrorMessage(error.message)}</p>
        <p className="text-sm text-white/60">
          Platform console (partners, content) is separate:{' '}
          <LinkButton text="/thp/login" href="/thp/login" variant="text" intensity={1} noMargin />
        </p>
        <button
          type="button"
          className="rounded-button bg-accent px-6 py-3 text-sm font-bold text-background hover:bg-[--color-gold-hover]"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          {isFetching ? 'Retrying…' : 'Try again'}
        </button>
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
