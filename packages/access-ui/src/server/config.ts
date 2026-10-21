import 'server-only'

export const SESSION_COOKIE = 'hp_thp_session'

export type BffConfig = {
  accessUrl: string
  publicKey: string | undefined
  secretKey: string | undefined
  tenantSlug: string
  siteOrigin: string | undefined
}

export function loadBffConfig(): BffConfig {
  const accessUrl = (process.env.HP_ACCESS_URL ?? '').replace(/\/$/, '')
  const tenantSlug = (process.env.HP_TENANT_SLUG ?? 'hardport').trim()
  return {
    accessUrl,
    publicKey: process.env.NEXT_PUBLIC_HP_PUBLIC_KEY?.trim() || undefined,
    secretKey: process.env.HP_SECRET_KEY?.trim() || undefined,
    tenantSlug,
    siteOrigin: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || undefined,
  }
}
