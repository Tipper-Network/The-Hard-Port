import { productPathFromPrefix } from '@psyferblock/access/product-path'

/**
 * THP Access public catalog — digital products (guides, unlocks). Separate from the
 * SMB service funnel: application → qualification → Business Reality Diagnostic → intervention.
 *
 * Nav may show "Catalog" once HP Access is deployed (`useAccessInstalled`). The homepage and
 * apply path stay service-focused; do not add catalog or product CTAs to the landing funnel.
 */
export const THP_CATALOG_PATH = '/thp/catalog'

export function thpProductPath(slug: string): string {
  return productPathFromPrefix(slug, THP_CATALOG_PATH)
}
