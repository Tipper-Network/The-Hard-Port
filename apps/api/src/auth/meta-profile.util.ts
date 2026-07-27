import type { Profile } from 'passport-facebook'

/** Meta `birthday` is MM/DD/YYYY when year is shared; otherwise MM/DD only. */
export function parseMetaBirthday(raw?: string | null): Date | null {
  const value = raw?.trim()
  if (!value) return null

  const parts = value.split('/').map((part) => Number.parseInt(part, 10))
  if (parts.length === 3) {
    const [month, day, year] = parts
    if (!month || !day || !year) return null
    const date = new Date(Date.UTC(year, month - 1, day))
    return Number.isNaN(date.getTime()) ? null : date
  }

  return null
}

export function extractMetaHometown(profile: Profile): string | null {
  const hometown = profile._json?.hometown as { name?: string } | undefined
  const name = hometown?.name?.trim()
  return name || null
}

export function extractMetaGender(profile: Profile): string | null {
  const gender = profile.gender?.trim() || profile._json?.gender?.trim()
  return gender || null
}

export function extractMetaProfileFields(profile: Profile) {
  return {
    birthDate: parseMetaBirthday(profile.birthday ?? profile._json?.birthday),
    gender: extractMetaGender(profile),
    hometown: extractMetaHometown(profile),
  }
}
