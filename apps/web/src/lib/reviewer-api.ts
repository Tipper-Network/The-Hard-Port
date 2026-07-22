import { getAccessToken, getApiUrl } from '@/lib/auth-session'

export type ApplicationSummary = {
  id: string
  submittedAt: string
  founderName: string
  businessName: string
  email: string
  discoverySource: string
  clientId: string | null
  lifecycleStatus: string
  createdAt: string
}

export type ListApplicationsResult =
  | { ok: true; applications: ApplicationSummary[] }
  | { ok: false; error: string; unauthorized?: boolean }

export async function listApplications(): Promise<ListApplicationsResult> {
  const token = getAccessToken()
  if (!token) {
    return { ok: false, error: 'Not signed in', unauthorized: true }
  }

  try {
    const res = await fetch(`${getApiUrl()}/intake/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const body: unknown = await res.json().catch(() => null)

    if (res.status === 401) {
      return { ok: false, error: 'Session expired', unauthorized: true }
    }

    if (!res.ok) {
      const message =
        body &&
        typeof body === 'object' &&
        'message' in body &&
        typeof body.message === 'string'
          ? body.message
          : 'Failed to load applications'
      return { ok: false, error: message }
    }

    if (
      body &&
      typeof body === 'object' &&
      'ok' in body &&
      body.ok === true &&
      'applications' in body &&
      Array.isArray(body.applications)
    ) {
      return { ok: true, applications: body.applications as ApplicationSummary[] }
    }

    return { ok: false, error: 'Unexpected response from API' }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Request failed',
    }
  }
}
