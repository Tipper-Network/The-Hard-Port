/** BFF route handlers — proxy auth/admin to Access; no AWS SDK here. */
export { GET, POST, PATCH, handleAccessApi } from './handler'
export { proxyKeywordLookup, type KeywordLookupProxyBody } from './keyword-lookup-proxy'
