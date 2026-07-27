/** Extract dial code when user leads with + (e.g. +254712..., +44 7700...) */
export function parsePhoneCountryCode(phone: string): string | null {
  const trimmed = phone.trim()
  if (!trimmed.startsWith('+')) return null

  const digits = trimmed.slice(1).replace(/\D/g, '')
  if (!digits) return null

  const candidates = [3, 2, 1]
    .map((len) => digits.slice(0, len))
    .filter((code) => code.length > 0)

  for (const code of candidates) {
    if (code.length >= 1 && code.length <= 3) {
      return `+${code}`
    }
  }

  return `+${digits.slice(0, 3)}`
}

export function localeRegionHint(locale: string): string | null {
  const parts = locale.split('-')
  const region = parts[1]?.toUpperCase()
  if (region && /^[A-Z]{2}$/.test(region)) return region
  return null
}
