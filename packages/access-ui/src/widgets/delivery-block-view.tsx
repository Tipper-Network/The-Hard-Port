'use client'

import type { ContentPayload } from '../types/public-content'
import type { DeliveryBlock } from '../lib/delivery-blocks'

type Props = {
  block: DeliveryBlock
  content: ContentPayload
  variant: 'hero' | 'row'
}

function blockHref(block: DeliveryBlock): string | null {
  if (block.type === 'youtube') return null
  return block.url
}

export function DeliveryBlockView({ block, content, variant }: Props) {
  const href = blockHref(block)

  if (block.type === 'youtube') {
    return (
      <div className={variant === 'hero' ? 'hp-product__embed' : 'hp-product__embed hp-product__embed--compact'}>
        <iframe
          title={content.title}
          src={block.embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (variant === 'row' && href) {
    return (
      <a className="hp-product__resource-link" href={href} target="_blank" rel="noopener noreferrer">
        <span className="hp-product__resource-title">{block.label}</span>
        <span className="hp-product__resource-url">{href.replace(/^https?:\/\//, '')}</span>
      </a>
    )
  }

  if (block.type === 'pdf' && href) {
    return (
      <div className="hp-product__pdf-wrap">
        <iframe title={`${content.title} PDF`} src={href} className="hp-product__pdf-frame" />
        <div className="hp-product__pdf-actions">
          <a className="hp-product__cta" href={href} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <a className="hp-product__cta hp-product__cta--ghost" href={href} download>
            Download
          </a>
        </div>
      </div>
    )
  }

  if (block.type === 'substack' && href) {
    return (
      <div className="hp-product__callout">
        <p className="hp-product__callout-text">
          Full article is on Substack. We do not paste it here; go read it where it was published.
        </p>
        <a className="hp-product__cta" href={href} target="_blank" rel="noopener noreferrer">
          {block.label}
        </a>
      </div>
    )
  }

  if (block.type === 'booking' && href) {
    return (
      <div className="hp-product__callout">
        <p className="hp-product__callout-text">Pick a slot. Show up with the work done, not excuses.</p>
        <a className="hp-product__cta" href={href} target="_blank" rel="noopener noreferrer">
          {block.label}
        </a>
      </div>
    )
  }

  if (block.type === 'file' && href) {
    return (
      <div className="hp-product__callout">
        <p className="hp-product__callout-text">File is ready. Save a copy; do not assume this link lasts forever.</p>
        <a className="hp-product__cta" href={href} target="_blank" rel="noopener noreferrer">
          {block.label}
        </a>
      </div>
    )
  }

  return null
}
