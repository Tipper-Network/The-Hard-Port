'use client'

import { useState } from 'react'

import { fetchPublicContent, getOrCreateAnonId, lookupKeyword, storeKeywordSession } from '../lib/public-api'
import type { ContentPayload, ContentTeaser } from '../types/public-content'
import { ProductUnlocked } from './product-unlocked'

type Props = {
  slug: string
  accessUrl: string
  publicKey: string
  teaser: ContentTeaser
}

function formatFreeFrom(iso: string | null): string | null {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(iso))
  } catch {
    return null
  }
}

export function ProductGate({ slug, accessUrl, publicKey, teaser }: Props) {
  const [word, setWord] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState<ContentPayload | null>(null)

  const freeDate = formatFreeFrom(teaser.freeFrom)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const anonId = getOrCreateAnonId(window.localStorage)
      const hit = await lookupKeyword(accessUrl, publicKey, word, anonId, slug)
      if (!hit.ok) {
        setError(hit.reason === 'network' ? 'Network error. Try again.' : 'Wrong word, or this page is not unlocked that way.')
        return
      }
      const page = await fetchPublicContent(accessUrl, publicKey, slug, hit.session)
      if (page.found && page.access) {
        storeKeywordSession(slug, hit.session)
        setUnlocked(page.content)
        return
      }
      setError('That word did not unlock this page.')
    } finally {
      setBusy(false)
    }
  }

  if (unlocked) {
    return (
      <div className="hp-product__inner hp-product__inner--wide">
        <ProductUnlocked content={unlocked} />
      </div>
    )
  }

  return (
    <div className="hp-product__inner">
      <h1>{teaser.title}</h1>
      {teaser.summary ? <p className="hp-product__summary">{teaser.summary}</p> : null}

      <section className="hp-product__panel hp-product__gate">
        {teaser.accessMode === 'paid' ? (
          <p className="hp-product__summary">
            Paid access only. Checkout is not wired on this page yet — staff can grant access manually until then.
          </p>
        ) : (
          <>
            <p className="hp-product__summary" style={{ marginBottom: '1rem' }}>
              You need the keyword from the video or post. No keyword, no file — that is the deal.
              {freeDate ? ` Or wait until ${freeDate} when it opens on its own.` : null}
            </p>
            <form onSubmit={(e) => void submit(e)}>
              {error ? <p className="hp-product__error">{error}</p> : null}
              <label htmlFor="hp-kw">Keyword</label>
              <input
                id="hp-kw"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                required
              />
              <button type="submit" disabled={busy}>
                {busy ? 'Checking…' : 'Unlock'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
