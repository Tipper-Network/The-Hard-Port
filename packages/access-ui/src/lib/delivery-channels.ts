import type { ContentPayload } from '../types/public-content'
import { substackEmbedUrl } from './substack-embed'
import { looksLikePdfUrl, looksLikeYoutubeUrl, youtubeEmbedUrl, youtubeWatchUrl } from './youtube-embed'

export type WatchOnSite = { embedUrl: string }
export type WatchOnYoutube = { watchUrl: string }

export type ReadOnSite =
  | { variant: 'pdf'; url: string }
  | { variant: 'substack-embed'; embedUrl: string }

export type ReadOnSubstack = { articleUrl: string }

export type DeliveryChannels = {
  watch: { onSite: WatchOnSite | null; onYoutube: WatchOnYoutube | null }
  read: { onSite: ReadOnSite | null; onSubstack: ReadOnSubstack | null }
  bookingUrl: string | null
  /** Non-PDF file on CDN (zip, etc.). */
  downloadUrl: string | null
}

function firstYoutubeSource(content: ContentPayload): string {
  const fromField = content.youtubeUrl?.trim()
  if (fromField) return fromField
  const body = content.bodyRef?.trim()
  if (body && looksLikeYoutubeUrl(body)) return body
  if (content.kind === 'video' && body) return body
  return ''
}

function bodyAsset(content: ContentPayload): string {
  const body = content.bodyRef?.trim()
  if (!body || looksLikeYoutubeUrl(body)) return ''
  return body
}

/** Splits post-access fields into on-site vs YouTube / Substack choices. */
export function deliveryChannelsFor(content: ContentPayload): DeliveryChannels {
  const ytRaw = firstYoutubeSource(content)
  const embed = ytRaw ? youtubeEmbedUrl(ytRaw) : null
  const watchUrl = ytRaw ? youtubeWatchUrl(ytRaw) : null

  const watch = {
    onSite: embed ? { embedUrl: embed } : null,
    onYoutube: watchUrl ? { watchUrl } : null,
  }

  const substackArticle = content.substackUrl?.trim() || ''
  const substackEmbed = substackArticle ? substackEmbedUrl(substackArticle) : null
  const asset = bodyAsset(content)

  let readOnSite: ReadOnSite | null = null
  if (asset && looksLikePdfUrl(asset)) {
    readOnSite = { variant: 'pdf', url: asset }
  } else if (substackEmbed) {
    readOnSite = { variant: 'substack-embed', embedUrl: substackEmbed }
  }

  const read = {
    onSite: readOnSite,
    onSubstack: substackArticle ? { articleUrl: substackArticle } : null,
  }

  const bookingUrl = content.kind === 'session' ? content.bookingUrl?.trim() || null : null

  let downloadUrl: string | null = null
  if (asset && !looksLikePdfUrl(asset) && content.kind !== 'session') {
    downloadUrl = asset
  }

  return { watch, read, bookingUrl, downloadUrl }
}

export function hasWatchOptions(ch: DeliveryChannels): boolean {
  return Boolean(ch.watch.onSite || ch.watch.onYoutube)
}

export function hasReadOptions(ch: DeliveryChannels): boolean {
  return Boolean(ch.read.onSite || ch.read.onSubstack)
}
