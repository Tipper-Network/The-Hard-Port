'use client'

import { deliveryChannelsFor, hasReadOptions, hasWatchOptions } from '../lib/delivery-channels'
import { kindLabel } from '../lib/product-layout'
import type { ContentPayload } from '../types/public-content'
import { ReadSection } from './read-section'
import { WatchSection } from './watch-section'

export type ProductUnlockedProps = {
  content: ContentPayload
}

/**
 * Post-access product page: explicit on-site vs YouTube / Substack, plus booking and downloads.
 */
export function ProductUnlocked({ content }: ProductUnlockedProps) {
  const channels = deliveryChannelsFor(content)
  const label = kindLabel(content.kind)
  const showWatch = hasWatchOptions(channels)
  const showRead = hasReadOptions(channels)
  const hasDelivery = showWatch || showRead || channels.bookingUrl || channels.downloadUrl

  return (
    <article className="hp-product__page">
      <header className="hp-product__header">
        <p className="hp-product__kind">
          <span className="hp-product__kind-pill">{label}</span>
        </p>
        <h1>{content.title}</h1>
        {content.summary ? <p className="hp-product__summary">{content.summary}</p> : null}
      </header>

      {!hasDelivery ? (
        <section className="hp-product__panel hp-product__panel--empty">
          <p className="hp-product__empty">Unlocked, but there is nothing to deliver yet. Staff still owe you a URL or file.</p>
        </section>
      ) : null}

      {showWatch ? <WatchSection content={content} channels={channels} /> : null}
      {showRead ? <ReadSection content={content} channels={channels} /> : null}

      {channels.bookingUrl ? (
        <section className="hp-product__panel" aria-labelledby="hp-book-heading">
          <h2 id="hp-book-heading" className="hp-product__section-title">
            Session
          </h2>
          <div className="hp-product__callout">
            <p className="hp-product__callout-text">Pick a slot. Show up with the work done, not excuses.</p>
            <a className="hp-product__cta" href={channels.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a session
            </a>
          </div>
        </section>
      ) : null}

      {channels.downloadUrl ? (
        <section className="hp-product__panel" aria-labelledby="hp-dl-heading">
          <h2 id="hp-dl-heading" className="hp-product__section-title">
            Download
          </h2>
          <div className="hp-product__callout">
            <p className="hp-product__callout-text">File is on our CDN. Save a copy; do not assume the link lasts forever.</p>
            <a className="hp-product__cta" href={channels.downloadUrl} target="_blank" rel="noopener noreferrer">
              Download file
            </a>
          </div>
        </section>
      ) : null}

      <ProductAttribution content={content} />
    </article>
  )
}

function ProductAttribution({ content }: { content: ContentPayload }) {
  if (!content.sourceLabel && !content.sourceUrl) return null

  return (
    <footer className="hp-product__attribution">
      <h2 className="hp-product__section-title hp-product__section-title--small">Where this came from</h2>
      {content.sourceLabel ? <p className="hp-product__attribution-label">{content.sourceLabel}</p> : null}
      {content.sourceUrl ? (
        <a className="hp-product__attribution-link" href={content.sourceUrl} target="_blank" rel="noopener noreferrer">
          {content.sourceUrl.replace(/^https?:\/\//, '')}
        </a>
      ) : null}
    </footer>
  )
}
