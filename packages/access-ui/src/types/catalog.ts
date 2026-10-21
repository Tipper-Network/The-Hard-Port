export type CatalogItem = {
  slug: string
  title: string
  summary: string | null
  kind: string
  accessMode: string
  priceMinor: number | null
  currency: string | null
}
