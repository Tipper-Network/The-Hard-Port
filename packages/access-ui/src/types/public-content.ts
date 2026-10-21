export type ContentKind = 'guide' | 'part' | 'video' | 'session' | 'ebook' | 'download'

export type ContentTeaser = {
  slug: string
  title: string
  summary: string | null
  accessMode: 'open' | 'keyword_first' | 'paid'
  freeFrom: string | null
}

export type ContentPayload = {
  slug: string
  title: string
  kind: ContentKind | string
  summary: string | null
  bodyRef: string | null
  bookingUrl: string | null
  youtubeUrl: string | null
  substackUrl: string | null
  sourceLabel: string | null
  sourceUrl: string | null
}

export type ContentPageData =
  | { found: false }
  | { found: true; access: false; teaser: ContentTeaser }
  | { found: true; access: true; content: ContentPayload }

export type V1ContentResponse = {
  ok?: boolean
  access?: boolean
  teaser?: ContentTeaser
  content?: ContentPayload
  error?: string
}
