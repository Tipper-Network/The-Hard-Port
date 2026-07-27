import { authFetch, getServerApiUrl, publicFetch } from '@/lib/api/client'

export type AuthProviders = {
  google: boolean
  meta: boolean
}

export type AuthenticatedUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'reviewer' | 'admin'
}

export type AuthProvidersResult =
  | { ok: true; providers: AuthProviders }
  | { ok: false; error: string }

export type CurrentUserResult =
  | { ok: true; user: AuthenticatedUser }
  | { ok: false; error: string; unauthorized?: boolean }

const emptyProviders: AuthProviders = { google: false, meta: false }

export async function getAuthProviders(): Promise<AuthProvidersResult> {
  const result = await publicFetch<{ google: boolean; meta: boolean }>('/auth/providers')
  if (!result.ok) return result
  return {
    ok: true,
    providers: {
      google: result.google,
      meta: result.meta,
    },
  }
}

export async function fetchAuthProvidersServer(): Promise<AuthProviders> {
  try {
    const res = await fetch(`${getServerApiUrl()}/auth/providers`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return emptyProviders
    const body: unknown = await res.json()
    if (!body || typeof body !== 'object' || !('ok' in body) || body.ok !== true) {
      return emptyProviders
    }
    return {
      google: 'google' in body && body.google === true,
      meta: 'meta' in body && body.meta === true,
    }
  } catch {
    return emptyProviders
  }
}

export async function getCurrentUser(): Promise<CurrentUserResult> {
  const result = await authFetch<{ user: AuthenticatedUser }>('/auth/me')
  if (!result.ok) return result
  return { ok: true, user: result.user }
}
