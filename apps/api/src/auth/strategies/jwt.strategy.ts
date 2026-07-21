import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import type { AuthenticatedUser, JwtPayload } from '../auth.types'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const partial = this.authService.assertJwtPayload(payload)
    const user = await this.authService.getUserById(partial.id)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    return user
  }
}
