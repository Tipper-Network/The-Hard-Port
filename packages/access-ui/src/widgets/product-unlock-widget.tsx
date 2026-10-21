'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getOrCreateAnonId, storeKeywordSession } from '../lib/public-api'
import '../product.css'

export type ProductUnlockWidgetProps = {
  /** Published product slug (`access.content_items.slug`); sent with the keyword lookup. */
  contentSlug: string
  /** Where to POST `{ word, anonId, contentSlug }`. Default: `/api/hp/keywords/lookup`. */
  lookupUrl?: string
  /** After unlock. Default `/p/{contentSlug}`. */
  productPath?: (slug: string) => string
  title?: string
  lede?: string
}

type Step = 'email' | 'code'

export function ProductUnlockWidget({
  contentSlug,
  lookupUrl = '/api/hp/keywords/lookup',
  productPath = (slug) => `/p/${slug}`,
  title = 'Get the thing',
  lede = 'Email first, then the access code from the video or post.',
}: ProductUnlockWidgetProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Email is required.')
      return
    }
    window.sessionStorage.setItem('hp_unlock_email', trimmed)
    setStep('code')
  }

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const anonId = getOrCreateAnonId(window.localStorage)
      const res = await fetch(lookupUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ word: code.trim(), anonId, contentSlug }),
      })
      const data = (await res.json()) as { ok?: boolean; session?: string; slug?: string; error?: string }
      if (!res.ok || !data.ok || !data.session || data.slug !== contentSlug) {
        setError('Wrong code for this product, or Access is not wired on this site.')
        return
      }
      storeKeywordSession(contentSlug, data.session)
      router.push(productPath(contentSlug))
    } catch {
      setError('Request failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="hp-product hp-product__panel hp-product__gate hp-unlock-widget">
      <h2 className="hp-unlock-widget__title">{title}</h2>
      <p className="hp-product__summary hp-unlock-widget__lede">{lede}</p>
      {step === 'email' ? (
        <form onSubmit={submitEmail}>
          {error ? <p className="hp-product__error">{error}</p> : null}
          <label htmlFor="hp-unlock-email">Email</label>
          <input
            id="hp-unlock-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
        </form>
      ) : (
        <form onSubmit={(e) => void submitCode(e)}>
          {error ? <p className="hp-product__error">{error}</p> : null}
          <p className="hp-product__summary hp-unlock-widget__step-note">Code is the keyword from the drop; not a password you reset.</p>
          <label htmlFor="hp-unlock-code">Access code</label>
          <input
            id="hp-unlock-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            required
          />
          <button type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Open product'}
          </button>
        </form>
      )}
    </div>
  )
}
