import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-facebook'

import type { OAuthProfile } from '../auth.types'
import { AuthService } from '../auth.service'
import { META_OAUTH_SCOPES, META_PROFILE_FIELDS } from '../meta-oauth.constants'
import { extractMetaProfileFields } from '../meta-profile.util'

@Injectable()
export class MetaStrategy extends PassportStrategy(Strategy, 'meta') {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.getOrThrow<string>('META_APP_ID'),
      clientSecret: config.getOrThrow<string>('META_APP_SECRET'),
      callbackURL: config.getOrThrow<string>('META_CALLBACK_URL'),
      scope: [...META_OAUTH_SCOPES],
      profileFields: [...META_PROFILE_FIELDS],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: Error | null, user?: unknown) => void,
  ) {
    try {
      const email = profile.emails?.[0]?.value
      if (!email) {
        return done(new Error('Meta account has no email'))
      }

      const metaProfile = extractMetaProfileFields(profile)

      const oauthProfile: OAuthProfile = {
        provider: 'meta',
        providerAccountId: profile.id,
        email,
        name: profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' '),
        image: profile.photos?.[0]?.value,
        accessToken,
        refreshToken,
        birthDate: metaProfile.birthDate,
        gender: metaProfile.gender,
        hometown: metaProfile.hometown,
      }

      const user = await this.authService.validateOAuthLogin(oauthProfile)
      done(null, user)
    } catch (err) {
      done(err as Error)
    }
  }
}
