import type { OAuthProfile } from './auth.types'

type ExistingUser = {
  name: string | null
  image: string | null
}

export function buildOAuthUserData(profile: OAuthProfile, existing?: ExistingUser) {
  const data: {
    name?: string | null
    image?: string | null
    birthDate?: Date | null
    gender?: string | null
    hometown?: string | null
  } = {
    name: profile.name ?? existing?.name ?? null,
    image: profile.image ?? existing?.image ?? null,
  }

  if (profile.birthDate !== undefined) {
    data.birthDate = profile.birthDate
  }
  if (profile.gender !== undefined) {
    data.gender = profile.gender
  }
  if (profile.hometown !== undefined) {
    data.hometown = profile.hometown
  }

  return data
}
