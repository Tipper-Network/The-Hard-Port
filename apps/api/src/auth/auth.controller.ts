import {
  Controller,
  Get,
  Next,
  Req,
  Res,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'
import * as passport from 'passport'

import type { AuthenticatedUser } from './auth.types'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { JwtAuthGuard } from './guards/auth.guards'
import { META_OAUTH_SCOPES } from './meta-oauth.constants'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('providers')
  providers() {
    return {
      ok: true,
      google: this.authService.isGoogleEnabled(),
      meta: this.authService.isMetaEnabled(),
    }
  }

  @Get('google')
  google(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.assertGoogleEnabled()
    return passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next)
  }

  @Get('google/callback')
  googleCallback(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.assertGoogleEnabled()
    passport.authenticate('google', { session: false }, (err: Error | null, user?: AuthenticatedUser) => {
      if (err || !user) {
        return this.redirectAuthError(res, err?.message ?? 'Google authentication failed')
      }
      return this.finishOAuth(user, res)
    })(req, res, next)
  }

  @Get('meta')
  meta(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.assertMetaEnabled()
    return passport.authenticate('meta', { scope: [...META_OAUTH_SCOPES] })(req, res, next)
  }

  @Get('meta/callback')
  metaCallback(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.assertMetaEnabled()
    passport.authenticate('meta', { session: false }, (err: Error | null, user?: AuthenticatedUser) => {
      if (err || !user) {
        return this.redirectAuthError(res, err?.message ?? 'Meta authentication failed')
      }
      return this.finishOAuth(user, res)
    })(req, res, next)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthenticatedUser) {
    return { ok: true, user }
  }

  private finishOAuth(user: AuthenticatedUser, res: Response) {
    const { accessToken } = this.authService.issueAccessToken(user)
    const webUrl = this.authService.getWebCallbackUrl()
    res.redirect(`${webUrl}/auth/callback?token=${encodeURIComponent(accessToken)}`)
  }

  private redirectAuthError(res: Response, message: string) {
    const webUrl = this.authService.getWebCallbackUrl()
    res.redirect(`${webUrl}/auth/error?message=${encodeURIComponent(message)}`)
  }

  private assertGoogleEnabled() {
    if (!this.authService.isGoogleEnabled()) {
      throw new ServiceUnavailableException('Google OAuth is not configured')
    }
  }

  private assertMetaEnabled() {
    if (!this.authService.isMetaEnabled()) {
      throw new ServiceUnavailableException('Meta OAuth is not configured')
    }
  }
}
