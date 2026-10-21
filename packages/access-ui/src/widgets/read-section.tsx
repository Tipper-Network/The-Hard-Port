'use client'

import { useMemo, useState } from 'react'

import type { DeliveryChannels } from '../lib/delivery-channels'
import type { ContentPayload } from '../types/public-content'
import { ModeToggle } from './mode-toggle'

type Props = {
  content: ContentPayload
  channels: DeliveryChannels
}

export function ReadSection({ content, channels }: Props) {
  const { onSite, onSubstack } = channels.read
  const defaultMode = onSite ? 'here' : 'substack'
  const [mode, setMode] = useState(defaultMode)

  const options = useMemo(
    () => [
      { id: 'here', label: 'Read on this page', disabled: !onSite },
      { id: 'substack', label: 'Read on Substack', disabled: !onSubstack },
    ],
    [onSite, onSubstack],
  )

  const active = mode === 'here' && onSite ? 'here' : mode === 'substack' && onSubstack ? 'substack' : defaultMode

  return (
    <section className="hp-product__panel" aria-labelledby="hp-read-heading">
      <h2 id="hp-read-heading" className="hp-product__section-title">
        Read
      </h2>
      <ModeToggle name="Read" value={active} options={options} onChange={setMode} />
      <div className="hp-product__mode-body" role="tabpanel">
        {active === 'here' && onSite ? (
          <>
            {onSite.variant === 'pdf' ? (
              <div className="hp-product__pdf-wrap">
                <iframe title={`${content.title} PDF`} src={onSite.url} className="hp-product__pdf-frame" />
                <div className="hp-product__pdf-actions">
                  <a className="hp-product__cta hp-product__cta--ghost" href={onSite.url} target="_blank" rel="noopener noreferrer">
                    Open PDF in new tab
                  </a>
                  <a className="hp-product__cta hp-product__cta--ghost" href={onSite.url} download>
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                title={`${content.title} on Substack`}
                src={onSite.embedUrl}
                className="hp-product__substack-frame"
                scrolling="no"
              />
            )}
          </>
        ) : null}
        {active === 'substack' && onSubstack ? (
          <div className="hp-product__callout">
            <p className="hp-product__callout-text">Full post on Substack; subscribe, share, whatever you do there.</p>
            <a className="hp-product__cta" href={onSubstack.articleUrl} target="_blank" rel="noopener noreferrer">
              Open on Substack
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
