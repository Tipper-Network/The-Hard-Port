import { getAccessToken, getApiUrl } from '@/lib/auth/session'

type ApiError = { ok: false; error: string; unauthorized?: boolean }
type ApiOk<T> = { ok: true } & T

export type ApiResult<T> = ApiOk<T> | ApiError

function parseErrorMessage(body: unknown, fallback: string) {
  if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
    return body.message
  }
  return fallback
}

export async function publicFetch<T extends Record<string, unknown>>(
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      cache: 'no-store',
    })

    const body: unknown = await res.json().catch(() => null)

    if (!res.ok) {
      return { ok: false, error: parseErrorMessage(body, 'Request failed') }
    }

    if (body && typeof body === 'object' && 'ok' in body && body.ok === true) {
      return body as ApiOk<T>
    }

    return { ok: false, error: 'Unexpected response from API' }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Request failed',
    }
  }
}

export async function authFetch<T extends Record<string, unknown>>(
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const token = getAccessToken()
  if (!token) {
    return { ok: false, error: 'Not signed in', unauthorized: true }
  }

  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
      cache: 'no-store',
    })

    const body: unknown = await res.json().catch(() => null)

    if (res.status === 401) {
      return { ok: false, error: 'Session expired', unauthorized: true }
    }

    if (!res.ok) {
      return { ok: false, error: parseErrorMessage(body, 'Request failed') }
    }

    if (body && typeof body === 'object' && 'ok' in body && body.ok === true) {
      return body as ApiOk<T>
    }

    return { ok: false, error: 'Unexpected response from API' }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Request failed',
    }
  }
}

export function getServerApiUrl() {
  return (
    process.env.THP_API_URL?.trim().replace(/\/$/, '') ??
    process.env.NEXT_PUBLIC_THP_API_URL?.trim().replace(/\/$/, '') ??
    'http://localhost:3001'
  )
}

export function getConfiguredIntakeApiUrl() {
  return process.env.THP_API_URL?.trim().replace(/\/$/, '') ?? null
}
