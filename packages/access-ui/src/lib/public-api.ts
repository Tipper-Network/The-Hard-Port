import type { ContentPageData, V1ContentResponse } from '../types/public-content'

function parseContentPayload(json: V1ContentResponse): ContentPageData {
  if (json.access === true && json.content) {
    return { found: true, access: true, content: json.content }
  }
  if (json.access === false && json.teaser) {
    return { found: true, access: false, teaser: json.teaser }
  }
  return { found: false }
}

/** Browser: public key + optional keyword session (Origin sent by the browser). */
export async function fetchPublicContent(
  accessUrl: string,
  publicKey: string,
  slug: string,
  session?: string,
): Promise<ContentPageData> {
  const base = accessUrl.replace(/\/$/, '')
  const headers: Record<string, string> = { 'x-hp-key': publicKey }
  if (session) headers['x-hp-session'] = session
  const res = await fetch(`${base}/v1/content/${encodeURIComponent(slug)}`, { headers, credentials: 'omit' })
  if (res.status === 404) return { found: false }
  const json = (await res.json()) as V1ContentResponse
  return parseContentPayload(json)
}

export type KeywordLookupResult =
  | { ok: true; session: string; slug: string }
  | { ok: false; reason: 'network' | 'denied' | 'invalid' }

export async function lookupKeyword(
  accessUrl: string,
  publicKey: string,
  word: string,
  anonId: string,
): Promise<KeywordLookupResult> {
  const base = accessUrl.replace(/\/$/, '')
  try {
    const res = await fetch(`${base}/v1/keywords/lookup`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-hp-key': publicKey },
      body: JSON.stringify({ word, anonId }),
    })
    const json = (await res.json()) as { ok?: boolean; session?: string; slug?: string }
    if (res.ok && json.ok && json.session && json.slug) {
      return { ok: true, session: json.session, slug: json.slug }
    }
    return { ok: false, reason: res.status === 403 || res.status === 401 ? 'denied' : 'invalid' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}

/** Stable anonymous id for keyword lookup (16–64 chars). */
export function getOrCreateAnonId(storage: Storage): string {
  const key = 'hp_anon_id'
  const existing = storage.getItem(key)
  if (existing && /^[A-Za-z0-9_-]{16,64}$/.test(existing)) return existing
  const id = crypto.randomUUID().replace(/-/g, '')
  storage.setItem(key, id)
  return id
}
