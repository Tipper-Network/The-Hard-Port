/** Turns a YouTube watch / youtu.be URL into an embed-safe URL, or null. */
export function youtubeEmbedUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  try {
    const u = new URL(trimmed)
    const host = u.hostname.replace(/^www\./, '')
    let id: string | null = null
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v')
      else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2] ?? null
      else if (u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2] ?? null
    } else if (host === 'youtu.be') {
      id = u.pathname.slice(1).split('/')[0] || null
    }
    if (!id || !/^[a-zA-Z0-9_-]{6,32}$/.test(id)) return null
    return `https://www.youtube.com/embed/${id}`
  } catch {
    return null
  }
}

export function looksLikePdfUrl(url: string): boolean {
  try {
    const path = new URL(url).pathname.toLowerCase()
    return path.endsWith('.pdf')
  } catch {
    return url.toLowerCase().includes('.pdf')
  }
}

export function looksLikeYoutubeUrl(url: string): boolean {
  return youtubeEmbedUrl(url) !== null
}

/** Canonical watch URL for opening YouTube in a new tab. */
export function youtubeWatchUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  const embed = youtubeEmbedUrl(trimmed)
  if (embed) {
    const id = embed.split('/embed/')[1]?.split('?')[0]
    if (id) return `https://www.youtube.com/watch?v=${id}`
  }
  try {
    const u = new URL(trimmed)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be') return trimmed
  } catch {
    /* fall through */
  }
  return null
}
