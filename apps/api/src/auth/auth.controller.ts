import {
  Controller,
  Get,
  Req,
  Res,
  ServiceUnavailableException,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Request, Response } from 'express'

import type { AuthenticatedUser } from './auth.types'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { JwtAuthGuard } from './guards/auth.guards'
import { OAuthExceptionFilter } from './oauth-exception.filter'

type OAuthRequest = Request & { user: AuthenticatedUser }

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
  @UseGuards(AuthGuard('google'))
  @UseFilters(OAuthExceptionFilter)
  googleAuth() {
    this.assertGoogleEnabled()
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @UseFilters(OAuthExceptionFilter)
  googleCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    this.assertGoogleEnabled()
    this.finishOAuth(req.user, res)
  }

  @Get('meta')
  @UseGuards(AuthGuard('meta'))
  @UseFilters(OAuthExceptionFilter)
  metaAuth() {
    this.assertMetaEnabled()
  }

  @Get('meta/callback')
  @UseGuards(AuthGuard('meta'))
  @UseFilters(OAuthExceptionFilter)
  metaCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    this.assertMetaEnabled()
    this.finishOAuth(req.user, res)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthenticatedUser) {
    return { ok: true, user }
  }

  private finishOAuth(user: AuthenticatedUser, res: Response) {
    if (res.headersSent) return
    const { accessToken } = this.authService.issueAccessToken(user)
    const webUrl = this.authService.getWebCallbackUrl()
    res.redirect(`${webUrl}/auth/callback?token=${encodeURIComponent(accessToken)}`)
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
