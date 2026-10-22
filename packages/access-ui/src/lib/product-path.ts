/** Public product page URL from a path prefix and content slug. */
export function productPathFromPrefix(slug: string, prefix: string): string {
  const base = prefix.replace(/\/$/, '') || '/p'
  return `${base}/${encodeURIComponent(slug)}`
}
