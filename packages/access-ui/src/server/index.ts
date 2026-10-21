/** @deprecated Import `@psyferblock/access/server/routes` for BFF handlers, or `./config` / `./fetch-*` from pages. */
export * from './routes'
export { fetchContentForPage, type FetchContentOptions } from './fetch-content'
export { fetchCatalog, type CatalogItem } from './fetch-catalog'
export { isAccessInstalled, loadBffConfig } from './config'
