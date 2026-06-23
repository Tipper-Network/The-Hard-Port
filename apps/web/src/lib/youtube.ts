/** Extract a YouTube video ID from a URL or bare ID string */
export function getYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  if (/^[\w-]{11}$/.test(trimmed)) return trimmed

  try {
    const url = new URL(trimmed)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0]
      return id || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') return url.searchParams.get('v')
      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/')[2] ?? null
      }
      if (url.pathname.startsWith('/shorts/')) {
        return url.pathname.split('/')[2] ?? null
      }
    }
  } catch {
    return null
  }

  return null
}

type EmbedOptions = {
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  /** Hide play bar, fullscreen, keyboard controls, etc. */
  chromeless?: boolean
}

export function getYoutubeEmbedUrl(videoId: string, options: EmbedOptions = {}) {
  const {
    autoplay = false,
    muted = false,
    loop = false,
    chromeless = false,
  } = options

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })

  if (autoplay) params.set('autoplay', '1')
  if (muted) params.set('mute', '1')
  if (loop) {
    params.set('loop', '1')
    params.set('playlist', videoId)
  }
  if (chromeless) {
    params.set('controls', '0')
    params.set('disablekb', '1')
    params.set('fs', '0')
    params.set('iv_load_policy', '3')
    params.set('cc_load_policy', '0')
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}
