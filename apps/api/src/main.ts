import 'dotenv/config'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000'
  app.enableCors({ origin: corsOrigin.split(',').map((o) => o.trim()) })

  const port = Number(process.env.PORT ?? 3001)
  await app.listen(port)
}

bootstrap()
