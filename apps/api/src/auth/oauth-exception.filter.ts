import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common'
import type { Request, Response } from 'express'

import { AuthService } from './auth.service'

function messageFrom(exception: unknown): string {
  if (exception instanceof HttpException) {
    const body = exception.getResponse()
    if (typeof body === 'string') return body
    if (body && typeof body === 'object' && 'message' in body) {
      const m = (body as { message?: string | string[] }).message
      if (Array.isArray(m)) return m.join(', ')
      if (typeof m === 'string') return m
    }
    return exception.message
  }
  if (exception instanceof Error) return exception.message
  return 'Authentication failed'
}

/** Sends OAuth failures to the web app instead of JSON 500 / double redirects. */
@Catch(UnauthorizedException, ForbiddenException, Error)
export class OAuthExceptionFilter implements ExceptionFilter {
  constructor(private readonly authService: AuthService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()

    if (res.headersSent) return

    const oauthRoute =
      req.path === '/auth/google' ||
      req.path === '/auth/google/callback' ||
      req.path === '/auth/meta' ||
      req.path === '/auth/meta/callback'

    if (!oauthRoute) return

    const webUrl = this.authService.getWebCallbackUrl()
    const msg = messageFrom(exception)
    res.redirect(`${webUrl}/auth/error?message=${encodeURIComponent(msg)}`)
  }
}
