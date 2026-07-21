import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-facebook'

import type { OAuthProfile } from '../auth.types'
import { AuthService } from '../auth.service'

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
      scope: ['email'],
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
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

      const oauthProfile: OAuthProfile = {
        provider: 'meta',
        providerAccountId: profile.id,
        email,
        name: profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' '),
        image: profile.photos?.[0]?.value,
        accessToken,
        refreshToken,
      }

      const user = await this.authService.validateOAuthLogin(oauthProfile)
      done(null, user)
    } catch (err) {
      done(err as Error)
    }
  }
}
