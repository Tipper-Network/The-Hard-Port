/** BFF route handlers only (pulls in AWS SDK for S3 presign). Import from pages via subpath exports instead. */
export { GET, POST, PATCH, handleAccessApi } from './handler'
export { proxyKeywordLookup, type KeywordLookupProxyBody } from './keyword-lookup-proxy'
