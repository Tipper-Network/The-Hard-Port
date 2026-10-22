'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getOrCreateAnonId, storeKeywordSession } from '../lib/public-api'
import { productPathFromPrefix } from '../lib/product-path'
import '../product.css'

export type ProductUnlockWidgetProps = {
  /**
   * When set, keyword must unlock this product. Omit on site-wide social floaters
   * so each keyword can route to its own published slug.
   */
  contentSlug?: string
  lookupUrl?: string
  /** Product page base path. Default `/p`. THP: `/thp/catalog`. */
  productPathPrefix?: string
  title?: string
  lede?: string
  className?: string
}

type Step = 'code' | 'email'

export function ProductUnlockWidget({
  contentSlug,
  lookupUrl = '/api/hp/keywords/lookup',
  productPathPrefix = '/p',
  title = 'Coming from a video?',
  lede = 'Enter the word from the drop. We match it to the guide.',
  className,
}: ProductUnlockWidgetProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('code')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [pendingSession, setPendingSession] = useState<{ slug: string; session: string } | null>(null)

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const anonId = getOrCreateAnonId(window.localStorage)
      const body: { word: string; anonId: string; contentSlug?: string } = {
        word: code.trim(),
        anonId,
      }
      if (contentSlug?.trim()) body.contentSlug = contentSlug.trim()

      const res = await fetch(lookupUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      })
      const data = (await res.json()) as { ok?: boolean; session?: string; slug?: string; error?: string }
      if (!res.ok || !data.ok || !data.session || !data.slug) {
        setError('Wrong word, expired, or Access is not wired on this site.')
        return
      }
      if (contentSlug?.trim() && data.slug !== contentSlug.trim()) {
        setError('That word does not unlock this product.')
        return
      }
      setPendingSession({ slug: data.slug, session: data.session })
      setStep('email')
    } catch {
      setError('Request failed.')
    } finally {
      setBusy(false)
    }
  }

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Email is required.')
      return
    }
    if (!pendingSession) {
      setError('Start with the word from the video.')
      setStep('code')
      return
    }
    window.sessionStorage.setItem('hp_unlock_email', trimmed)
    storeKeywordSession(pendingSession.slug, pendingSession.session)
    router.push(productPathFromPrefix(pendingSession.slug, productPathPrefix))
  }

  const rootClass = ['hp-product', 'hp-product__panel', 'hp-product__gate', 'hp-unlock-widget', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      <h2 className="hp-unlock-widget__title">{title}</h2>
      <p className="hp-product__summary hp-unlock-widget__lede">{lede}</p>
      {step === 'code' ? (
        <form onSubmit={(e) => void submitCode(e)}>
          {error ? <p className="hp-product__error">{error}</p> : null}
          <label htmlFor="hp-unlock-code">Word from the video</label>
          <input
            id="hp-unlock-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="Word to comment"
            required
          />
          <button type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Continue'}
          </button>
        </form>
      ) : (
        <form onSubmit={submitEmail}>
          {error ? <p className="hp-product__error">{error}</p> : null}
          <p className="hp-product__summary hp-unlock-widget__step-note">Word found. Email so we know you showed up.</p>
          <label htmlFor="hp-unlock-email">Email</label>
          <input
            id="hp-unlock-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <button type="submit">Open your guide</button>
        </form>
      )}
    </div>
  )
}
