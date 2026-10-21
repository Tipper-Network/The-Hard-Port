'use client'

import type { ContentPayload } from '../types/public-content'
import { ProductUnlocked } from './product-unlocked'

type Props = {
  content: ContentPayload
}

/** @deprecated Name kept for imports; use `ProductUnlocked` for the full post-access layout. */
export function ProductDelivery({ content }: Props) {
  return (
    <div className="hp-product__inner hp-product__inner--wide">
      <ProductUnlocked content={content} />
    </div>
  )
}
