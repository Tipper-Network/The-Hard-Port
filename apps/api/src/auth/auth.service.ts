import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { OAuthProvider, UserRole } from '../generated/prisma/client'

import type { AuthenticatedUser, JwtPayload, OAuthProfile } from './auth.types'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateOAuthLogin(profile: OAuthProfile): Promise<AuthenticatedUser> {
    const email = profile.email.trim().toLowerCase()
    this.assertAllowlisted(email)

    const provider = profile.provider === 'google' ? OAuthProvider.google : OAuthProvider.meta

    const account = await this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: profile.providerAccountId,
        },
      },
      include: { user: true },
    })

    if (account) {
      await this.prisma.oAuthAccount.update({
        where: { id: account.id },
        data: {
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
        },
      })

      const user = await this.prisma.user.update({
        where: { id: account.userId },
        data: {
          name: profile.name ?? account.user.name,
          image: profile.image ?? account.user.image,
        },
      })

      return this.toAuthenticatedUser(user)
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } })

    if (existingUser?.role === UserRole.user) {
      throw new ForbiddenException('Applicant accounts cannot sign in here')
    }

    const user =
      existingUser ??
      (await this.prisma.user.create({
        data: {
          email,
          name: profile.name,
          image: profile.image,
          role: UserRole.reviewer,
        },
      }))

    await this.prisma.oAuthAccount.create({
      data: {
        userId: user.id,
        provider,
        providerAccountId: profile.providerAccountId,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
      },
    })

    return this.toAuthenticatedUser(user)
  }

  issueAccessToken(user: AuthenticatedUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    return {
      accessToken: this.jwt.sign(payload),
      user,
    }
  }

  async getUserById(id: string): Promise<AuthenticatedUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user ? this.toAuthenticatedUser(user) : null
  }

  getWebCallbackUrl() {
    return this.config.get<string>('WEB_APP_URL', 'http://localhost:3000').replace(/\/$/, '')
  }

  isGoogleEnabled() {
    return Boolean(
      this.config.get<string>('GOOGLE_CLIENT_ID')?.trim() &&
        this.config.get<string>('GOOGLE_CLIENT_SECRET')?.trim() &&
        this.config.get<string>('GOOGLE_CALLBACK_URL')?.trim(),
    )
  }

  isMetaEnabled() {
    return Boolean(
      this.config.get<string>('META_APP_ID')?.trim() &&
        this.config.get<string>('META_APP_SECRET')?.trim() &&
        this.config.get<string>('META_CALLBACK_URL')?.trim(),
    )
  }

  private assertAllowlisted(email: string) {
    const raw = this.config.get<string>('AUTH_ALLOWLIST', '').trim()
    if (!raw) return

    const allowed = raw
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean)

    if (!allowed.includes(email)) {
      throw new ForbiddenException('This account is not authorized for THP access')
    }
  }

  private toAuthenticatedUser(user: {
    id: string
    email: string
    name: string | null
    image: string | null
    role: UserRole
  }): AuthenticatedUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
    }
  }

  assertJwtPayload(payload: JwtPayload): AuthenticatedUser {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token')
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: null,
      image: null,
      role: payload.role ?? UserRole.reviewer,
    }
  }
}
