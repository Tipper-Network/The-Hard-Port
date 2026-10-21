'use client'

import Link from 'next/link'

import { kindLabel } from '../lib/product-layout'
import type { CatalogItem } from '../types/catalog'

type Props = {
  items: CatalogItem[]
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

export function CatalogGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="hp-product__summary" style={{ margin: 0 }}>
        Nothing published yet. Check back when the crew ships something worth opening.
      </p>
    )
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
                <Link href={`/p/${item.slug}`}>{item.title}</Link>
              </h2>
              {item.summary ? <p className="hp-catalog__summary">{item.summary}</p> : null}
              <div className="hp-catalog__footer">
                {price ? <span className="hp-catalog__price">{price}</span> : <span className="hp-catalog__price hp-catalog__price--free">Free</span>}
                <Link className="hp-catalog__cta" href={`/p/${item.slug}`}>
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
