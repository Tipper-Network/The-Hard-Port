import { Global, Module, Provider } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { MetaStrategy } from './strategies/meta.strategy'

const oauthProviders: Provider[] = []

if (
  process.env.GOOGLE_CLIENT_ID?.trim() &&
  process.env.GOOGLE_CLIENT_SECRET?.trim() &&
  process.env.GOOGLE_CALLBACK_URL?.trim()
) {
  oauthProviders.push(GoogleStrategy)
}

if (
  process.env.META_APP_ID?.trim() &&
  process.env.META_APP_SECRET?.trim() &&
  process.env.META_CALLBACK_URL?.trim()
) {
  oauthProviders.push(MetaStrategy)
}

@Global()
@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '7d') as `${number}d`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...oauthProviders],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
