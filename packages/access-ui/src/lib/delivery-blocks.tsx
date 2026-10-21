import type { ContentPayload } from '../types/public-content'
import { looksLikePdfUrl, looksLikeYoutubeUrl, youtubeEmbedUrl } from './youtube-embed'

export type DeliveryBlock =
  | { id: string; type: 'youtube'; embedUrl: string; label: string }
  | { id: string; type: 'pdf'; url: string; label: string }
  | { id: string; type: 'file'; url: string; label: string }
  | { id: string; type: 'substack'; url: string; label: string }
  | { id: string; type: 'booking'; url: string; label: string }

/** Builds ordered delivery blocks from whatever fields are set (layout adapts to data). */
export function deliveryBlocksFor(content: ContentPayload): DeliveryBlock[] {
  const blocks: DeliveryBlock[] = []
  const seen = new Set<string>()

  const push = (block: DeliveryBlock) => {
    const key = `${block.type}:${'embedUrl' in block ? block.embedUrl : block.url}`
    if (seen.has(key)) return
    seen.add(key)
    blocks.push(block)
  }

  if (content.kind === 'session' && content.bookingUrl) {
    push({ id: 'booking', type: 'booking', url: content.bookingUrl, label: 'Book a session' })
  }

  const yt = content.youtubeUrl?.trim() || (content.kind === 'video' ? content.bodyRef?.trim() : '')
  const ytEmbed = yt ? youtubeEmbedUrl(yt) : null
  if (ytEmbed) {
    push({ id: 'youtube', type: 'youtube', embedUrl: ytEmbed, label: 'Watch' })
  }

  if (content.substackUrl) {
    push({ id: 'substack', type: 'substack', url: content.substackUrl, label: 'Read on Substack' })
  }

  const asset = content.bodyRef?.trim()
  if (asset && !looksLikeYoutubeUrl(asset)) {
    if (looksLikePdfUrl(asset)) {
      push({ id: 'pdf', type: 'pdf', url: asset, label: 'View PDF' })
    } else if (content.kind !== 'session') {
      push({ id: 'file', type: 'file', url: asset, label: 'Download' })
    }
  }

  return blocks
}
