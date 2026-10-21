'use client'

import { useMemo, useState } from 'react'

import type { DeliveryChannels } from '../lib/delivery-channels'
import type { ContentPayload } from '../types/public-content'
import { ModeToggle } from './mode-toggle'

type Props = {
  content: ContentPayload
  channels: DeliveryChannels
}

export function WatchSection({ content, channels }: Props) {
  const { onSite, onYoutube } = channels.watch
  const defaultMode = onSite ? 'here' : 'youtube'
  const [mode, setMode] = useState(defaultMode)

  const options = useMemo(
    () => [
      { id: 'here', label: 'Watch on this page', disabled: !onSite },
      { id: 'youtube', label: 'Watch on YouTube', disabled: !onYoutube },
    ],
    [onSite, onYoutube],
  )

  const active = mode === 'here' && onSite ? 'here' : mode === 'youtube' && onYoutube ? 'youtube' : defaultMode

  return (
    <section className="hp-product__panel" aria-labelledby="hp-watch-heading">
      <h2 id="hp-watch-heading" className="hp-product__section-title">
        Watch
      </h2>
      <ModeToggle name="Watch" value={active} options={options} onChange={setMode} />
      <div className="hp-product__mode-body" role="tabpanel">
        {active === 'here' && onSite ? (
          <div className="hp-product__embed">
            <iframe
              title={content.title}
              src={onSite.embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
        {active === 'youtube' && onYoutube ? (
          <div className="hp-product__callout">
            <p className="hp-product__callout-text">Same video, on YouTube. Comments, algorithm, all of it.</p>
            <a className="hp-product__cta" href={onYoutube.watchUrl} target="_blank" rel="noopener noreferrer">
              Open on YouTube
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
