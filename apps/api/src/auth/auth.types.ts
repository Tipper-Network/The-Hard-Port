export type OAuthProviderName = 'google' | 'meta'

export type OAuthProfile = {
  provider: OAuthProviderName
  providerAccountId: string
  email: string
  name?: string
  image?: string
  accessToken?: string
  refreshToken?: string
  /** Set on Meta sign-in when Graph returns birthday (MM/DD/YYYY). */
  birthDate?: Date | null
  gender?: string | null
  hometown?: string | null
}

export type AuthenticatedUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'user' | 'reviewer' | 'admin'
  birthDate: string | null
  gender: string | null
  hometown: string | null
}

export type JwtPayload = {
  sub: string
  email: string
  role: 'user' | 'reviewer' | 'admin'
}
