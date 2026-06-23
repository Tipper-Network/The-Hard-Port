import { getYoutubeEmbedUrl, getYoutubeVideoId } from '#/lib/youtube'
import { cn } from '#/lib/utils'

type YoutubeEmbedProps = {
  url?: string
  title: string
  className?: string
  variant?: 'inline' | 'background'
}

const chromelessEmbedOptions = {
  autoplay: true,
  muted: true,
  loop: true,
  chromeless: true,
} as const

export function YoutubeEmbed({
  url,
  title,
  className,
  variant = 'inline',
}: YoutubeEmbedProps) {
  if (!url) return null

  const videoId = getYoutubeVideoId(url)
  if (!videoId) return null

  const src = getYoutubeEmbedUrl(videoId, chromelessEmbedOptions)
  const isBackground = variant === 'background'

  if (isBackground) {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
        <iframe
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-sm border border-primary/10 bg-primary shadow-[0_2px_2px_rgba(0,0,0,0.04)]',
        className,
      )}
    >
      <div className="aspect-video w-full overflow-hidden">
        <iframe
          className="pointer-events-none h-full w-full scale-[1.02] border-0"
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  )
}
