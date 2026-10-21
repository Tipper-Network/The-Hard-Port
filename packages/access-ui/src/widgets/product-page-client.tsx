'use client'

import { useEffect, useState } from 'react'

import { fetchPublicContent, readKeywordSession } from '../lib/public-api'
import type { ContentPageData } from '../types/public-content'
import { ProductGate } from './product-gate'
import { ProductUnlocked } from './product-unlocked'

type Props = {
  slug: string
  initial: ContentPageData
  accessUrl: string
  publicKey: string
}

/** Hydrates keyword session from sessionStorage (set by ProductUnlockWidget) then renders gate or unlocked. */
export function ProductPageClient({ slug, initial, accessUrl, publicKey }: Props) {
  const [page, setPage] = useState<ContentPageData>(initial)
  const initiallyOpen = initial.found && initial.access
  const [hydrating, setHydrating] = useState(initial.found && !initiallyOpen)

  useEffect(() => {
    if (!initial.found || initiallyOpen) {
      setHydrating(false)
      return
    }
    const session = readKeywordSession(slug)
    if (!session || !publicKey) {
      setHydrating(false)
      return
    }
    let cancelled = false
    void fetchPublicContent(accessUrl, publicKey, slug, session).then((next) => {
      if (!cancelled) {
        setPage(next)
        setHydrating(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [slug, initial.found, initiallyOpen, accessUrl, publicKey])

  if (!page.found) {
    return (
      <div className="hp-product__inner">
        <h1>Not found</h1>
        <p className="hp-product__summary">No published page at this address.</p>
      </div>
    )
  }

  if (hydrating) {
    return <p className="hp-product__summary">Loading access…</p>
  }

  if (page.access) {
    return (
      <div className="hp-product__inner hp-product__inner--wide">
        <ProductUnlocked content={page.content} />
      </div>
    )
  }

  return <ProductGate slug={slug} accessUrl={accessUrl} publicKey={publicKey} teaser={page.teaser} />
}
