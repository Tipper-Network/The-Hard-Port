const STORAGE_KEY = 'thp_access_token'

export function getAccessToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(STORAGE_KEY)
}

export function setAccessToken(token: string) {
  window.localStorage.setItem(STORAGE_KEY, token)
}

export function clearAccessToken() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function getApiUrl() {
  return process.env.NEXT_PUBLIC_THP_API_URL ?? 'http://localhost:3001'
}

export function getGoogleLoginUrl() {
  return `${getApiUrl()}/auth/google`
}

export function getMetaLoginUrl() {
  return `${getApiUrl()}/auth/meta`
}
