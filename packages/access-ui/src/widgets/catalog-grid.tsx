'use client'

import Link from 'next/link'

import '../product.css'

import { kindLabel } from '../lib/product-layout'
import type { CatalogItem } from '../types/catalog'
import { CatalogEmpty } from './catalog-empty'

type Props = {
  items: CatalogItem[]
  /** Base path for product pages, e.g. `/thp/catalog` → `/thp/catalog/{slug}`. Default `/p`. */
  productPathPrefix?: string
}

function hrefForSlug(slug: string, prefix: string): string {
  const base = prefix.replace(/\/$/, '') || '/p'
  return `${base}/${encodeURIComponent(slug)}`
}

function formatPrice(minor: number | null, currency: string | null): string | null {
  if (minor == null || minor <= 0) return null
  const code = (currency ?? 'USD').toUpperCase()
  const amount = minor / 100
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: code }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${code}`
  }
}

function ctaLabel(item: CatalogItem): string {
  if (item.accessMode === 'paid' && item.priceMinor != null && item.priceMinor > 0) return 'View & buy'
  if (item.accessMode === 'keyword_first') return 'Unlock'
  return 'View'
}

export function CatalogGrid({ items, productPathPrefix = '/p' }: Props) {
  if (items.length === 0) {
    return <CatalogEmpty />
  }

  return (
    <ul className="hp-catalog__grid">
      {items.map((item) => {
        const price = formatPrice(item.priceMinor, item.currency)
        return (
          <li key={item.slug}>
            <article className="hp-catalog__card">
              <p className="hp-catalog__kind">{kindLabel(item.kind)}</p>
              <h2 className="hp-catalog__title">
                <Link href={hrefForSlug(item.slug, productPathPrefix)}>{item.title}</Link>
              </h2>
              {item.summary ? <p className="hp-catalog__summary">{item.summary}</p> : null}
              <div className="hp-catalog__footer">
                {price ? <span className="hp-catalog__price">{price}</span> : <span className="hp-catalog__price hp-catalog__price--free">Free</span>}
                <Link className="hp-catalog__cta" href={hrefForSlug(item.slug, productPathPrefix)}>
                  {ctaLabel(item)}
                </Link>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
