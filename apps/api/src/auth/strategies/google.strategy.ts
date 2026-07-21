import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

import type { OAuthProfile } from '../auth.types'
import { AuthService } from '../auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string
      emails?: Array<{ value: string }>
      displayName?: string
      photos?: Array<{ value: string }>
    },
    done: VerifyCallback,
  ) {
    try {
      const email = profile.emails?.[0]?.value
      if (!email) {
        return done(new Error('Google account has no email'), false)
      }

      const oauthProfile: OAuthProfile = {
        provider: 'google',
        providerAccountId: profile.id,
        email,
        name: profile.displayName,
        image: profile.photos?.[0]?.value,
        accessToken,
        refreshToken,
      }

      const user = await this.authService.validateOAuthLogin(oauthProfile)
      done(null, user)
    } catch (err) {
      done(err as Error, false)
    }
  }
}
