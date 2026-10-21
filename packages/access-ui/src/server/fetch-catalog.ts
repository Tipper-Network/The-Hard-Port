import 'server-only'

import type { CatalogItem } from '../types/catalog'

type CatalogResponse = { items?: CatalogItem[] }

export type { CatalogItem } from '../types/catalog'

/** Published product rows for the public catalog page (tenant secret key, server-side). */
export async function fetchCatalog(opts: { accessUrl: string; secretKey: string }): Promise<CatalogItem[]> {
  const base = opts.accessUrl.replace(/\/$/, '')
  const res = await fetch(`${base}/v1/catalog`, {
    headers: { 'x-hp-key': opts.secretKey },
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = (await res.json()) as CatalogResponse
  return json.items ?? []
}
