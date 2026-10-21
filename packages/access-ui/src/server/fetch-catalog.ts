import 'server-only'

import type { CatalogItem } from '../types/catalog'

type CatalogResponse = { items?: CatalogItem[] }

export type { CatalogItem } from '../types/catalog'

export type CatalogFetchResult = {
  items: CatalogItem[]
  /** Access API was not reachable (e.g. nothing listening on HP_ACCESS_URL). */
  unreachable: boolean
}

/** Published product rows for the public catalog page (tenant secret key, server-side). */
export async function fetchCatalog(opts: { accessUrl: string; secretKey: string }): Promise<CatalogFetchResult> {
  const base = opts.accessUrl.replace(/\/$/, '')
  try {
    const res = await fetch(`${base}/v1/catalog`, {
      headers: { 'x-hp-key': opts.secretKey },
      cache: 'no-store',
    })
    if (!res.ok) return { items: [], unreachable: false }
    const json = (await res.json()) as CatalogResponse
    return { items: json.items ?? [], unreachable: false }
  } catch {
    return { items: [], unreachable: true }
  }
}
