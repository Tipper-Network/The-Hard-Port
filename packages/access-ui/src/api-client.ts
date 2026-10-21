export type SessionInfo = {
  ok: true
  tenant: string
  role: string
  partnerId: string | null
}

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return {}
  try {
    return JSON.parse(text) as unknown
  } catch {
    return { error: 'invalid_response' }
  }
}

export function apiBase(basePath: string): string {
  const root = basePath.replace(/\/$/, '')
  return `${root}/api`
}

export async function apiFetch(basePath: string, path: string, init?: RequestInit): Promise<Response> {
  const url = `${apiBase(basePath)}${path.startsWith('/') ? path : `/${path}`}`
  return fetch(url, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
    credentials: 'same-origin',
  })
}

export async function getSession(basePath: string): Promise<SessionInfo | null> {
  const res = await apiFetch(basePath, '/auth/session')
  if (res.status === 401) return null
  const data = (await parseJson(res)) as SessionInfo & { error?: string }
  if (!res.ok || !data.ok) return null
  return data
}
