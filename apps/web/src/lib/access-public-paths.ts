/** Public THP Access catalog (not marketing `/catalog`, not staff `/admin/thp`). */
export const THP_CATALOG_PATH = '/thp/catalog'

export function thpProductPath(slug: string): string {
  return `${THP_CATALOG_PATH}/${encodeURIComponent(slug)}`
}
