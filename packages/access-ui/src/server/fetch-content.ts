import 'server-only'

import type { ContentPageData, V1ContentResponse } from '../types/public-content'

export type FetchContentOptions = {
  accessUrl: string
  secretKey: string
  slug: string
  /** Keyword session from client unlock (optional). */
  session?: string
}

/**
 * Server-side read for product pages. Uses the tenant secret key (no Origin) — same as your Next server vouching for the page shell.
 * Gating still applies: keyword_first and paid rows return a teaser unless `session` or entitlements apply.
 */
export async function fetchContentForPage(opts: FetchContentOptions): Promise<ContentPageData> {
  const base = opts.accessUrl.replace(/\/$/, '')
  const headers: Record<string, string> = { 'x-hp-key': opts.secretKey }
  if (opts.session) headers['x-hp-session'] = opts.session
  const res = await fetch(`${base}/v1/content/${encodeURIComponent(opts.slug)}`, {
    headers,
    cache: 'no-store',
  })
  if (res.status === 404) return { found: false }
  const json = (await res.json()) as V1ContentResponse
  if (json.access === true && json.content) {
    return { found: true, access: true, content: json.content }
  }
  if (json.access === false && json.teaser) {
    return { found: true, access: false, teaser: json.teaser }
  }
  return { found: false }
}
