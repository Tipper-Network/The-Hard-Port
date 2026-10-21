/** Substack post URL → embed iframe src (`…/p/slug/embed`). */
export function substackEmbedUrl(postUrl: string): string | null {
  const trimmed = postUrl.trim()
  if (!trimmed) return null
  try {
    const u = new URL(trimmed)
    const host = u.hostname.replace(/^www\./, '')
    if (!host.endsWith('substack.com')) return null
    const path = u.pathname.replace(/\/$/, '')
    if (!path.includes('/p/')) return null
    if (path.endsWith('/embed')) return `${u.origin}${path}`
    return `${u.origin}${path}/embed`
  } catch {
    return null
  }
}
