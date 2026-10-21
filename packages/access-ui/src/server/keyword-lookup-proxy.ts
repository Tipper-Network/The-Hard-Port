import 'server-only'

import { loadBffConfig } from './config'

export type KeywordLookupProxyBody = {
  word: string
  anonId: string
  /** Product slug this unlock is for; keyword must map to this content row. */
  contentSlug?: string
}

export async function proxyKeywordLookup(
  body: KeywordLookupProxyBody,
  requestOrigin?: string | null,
): Promise<{ status: number; body: unknown }> {
  const config = loadBffConfig()
  if (!config.accessUrl || !config.publicKey) {
    return { status: 503, body: { error: 'access_not_installed' } }
  }

  const origin = requestOrigin ?? config.siteOrigin ?? null
  if (!origin) {
    return { status: 503, body: { error: 'missing_origin' } }
  }

  const res = await fetch(`${config.accessUrl}/v1/keywords/lookup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hp-key': config.publicKey,
      origin,
    },
    body: JSON.stringify({
      word: body.word,
      anonId: body.anonId,
      ...(body.contentSlug ? { contentSlug: body.contentSlug } : {}),
    }),
    cache: 'no-store',
  })

  let parsed: unknown = {}
  const text = await res.text()
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown
    } catch {
      parsed = { error: 'invalid_upstream' }
    }
  }

  return { status: res.status, body: parsed }
}
