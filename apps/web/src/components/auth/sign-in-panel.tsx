'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import LinkButton from '@/components/link-button'
import {
  getAuthProviders,
  getCurrentUser,
  type AuthProviders,
} from '@/lib/api/auth'
import { getAccessToken, getGoogleLoginUrl, getMetaLoginUrl } from '@/lib/auth/session'

type SignInPanelProps = {
  initialProviders?: AuthProviders
}

export function SignInPanel({ initialProviders }: SignInPanelProps) {
  const router = useRouter()
  const [providers, setProviders] = useState<AuthProviders | null>(initialProviders ?? null)
  const [loading, setLoading] = useState(!initialProviders)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!getAccessToken()) return

    let cancelled = false

    async function redirectIfSignedIn() {
      const result = await getCurrentUser()
      if (cancelled) return
      if (result.ok) {
        router.replace('/review')
      }
    }

    void redirectIfSignedIn()
    return () => {
      cancelled = true
    }
  }, [router])

  useEffect(() => {
    if (initialProviders) return

    let cancelled = false

    async function loadProviders() {
      const result = await getAuthProviders()
      if (cancelled) return

      if (!result.ok) {
        setError(result.error)
        setLoading(false)
        return
      }

      setProviders(result.providers)
      setLoading(false)
    }

    void loadProviders()
    return () => {
      cancelled = true
    }
  }, [initialProviders])

  if (loading) {
    return <p className="text-white/70">Loading sign-in options…</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{error}</p>
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
