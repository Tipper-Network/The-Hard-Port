'use client'

import '../product.css'

import type { ContentPageData } from '../types/public-content'
import { ProductPageClient } from './product-page-client'

export type ProductPageProps = {
  slug: string
  /** Initial payload from server (secret-key fetch). */
  initial: ContentPageData
  /** Hosted Access base URL, e.g. http://127.0.0.1:4001 */
  accessUrl: string
  /** Browser public key for keyword unlock + client refetch. */
  publicKey: string
}

/**
 * Visitor product page: layout changes with the data (YouTube embed, Substack link, PDF, booking, attribution).
 * Gated rows show a keyword gate until unlocked in the browser.
 */
export function ProductPage({ slug, initial, accessUrl, publicKey }: ProductPageProps) {
  if (!initial.found) {
    return (
      <div className="hp-product">
        <div className="hp-product__inner">
          <h1>Not found</h1>
          <p className="hp-product__summary">No published page at this address.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hp-product">
      <ProductPageClient slug={slug} initial={initial} accessUrl={accessUrl} publicKey={publicKey} />
    </div>
  )
}
