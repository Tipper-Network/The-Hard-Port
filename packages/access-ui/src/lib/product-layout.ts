import type { ContentPayload } from '../types/public-content'
import { deliveryBlocksFor, type DeliveryBlock } from './delivery-blocks'

const KIND_LABELS: Record<string, string> = {
  guide: 'Guide',
  part: 'Part',
  video: 'Video',
  session: 'Session',
  ebook: 'E-book',
  download: 'Download',
}

const PRIMARY_TYPES: Record<string, DeliveryBlock['type'][]> = {
  video: ['youtube'],
  session: ['booking'],
  guide: ['pdf', 'file'],
  ebook: ['pdf', 'file'],
  download: ['file', 'pdf'],
  part: ['file', 'pdf'],
}

export function kindLabel(kind: string): string {
  return KIND_LABELS[kind] ?? kind.replace(/_/g, ' ')
}

/** Picks a hero block by kind; everything else is listed under "Also here". */
export function splitDelivery(content: ContentPayload): { primary: DeliveryBlock | null; secondary: DeliveryBlock[] } {
  const blocks = deliveryBlocksFor(content)
  if (blocks.length === 0) return { primary: null, secondary: [] }

  const prefs = PRIMARY_TYPES[content.kind] ?? ['youtube', 'pdf', 'file', 'substack', 'booking']
  let primaryIndex = blocks.findIndex((b) => prefs.includes(b.type))
  if (primaryIndex < 0) primaryIndex = 0

  const primary = blocks[primaryIndex]!
  const secondary = blocks.filter((_, i) => i !== primaryIndex)
  return { primary, secondary }
}

/** Human label for a secondary resource row. */
export function blockResourceTitle(block: DeliveryBlock): string {
  switch (block.type) {
    case 'youtube':
      return 'Watch on YouTube'
    case 'substack':
      return 'Read on Substack'
    case 'pdf':
      return 'PDF'
    case 'file':
      return 'Download file'
    case 'booking':
      return 'Book a session'
  }
}
