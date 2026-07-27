export type OAuthProviderName = 'google' | 'meta'

export type OAuthProfile = {
  provider: OAuthProviderName
  providerAccountId: string
  email: string
  name?: string
  image?: string
  accessToken?: string
  refreshToken?: string
}

export type AuthenticatedUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'user' | 'reviewer' | 'admin'
}

export type JwtPayload = {
  sub: string
  email: string
  role: 'user' | 'reviewer' | 'admin'
}
