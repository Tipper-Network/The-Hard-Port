import { Injectable } from '@nestjs/common'
import type { Request } from 'express'
import { Prisma } from '../generated/prisma/client'

import { TrackEventsDto } from './dto/track-events.dto'
import { UsersService, type ApplicantProfile } from '../users/users.service'
import { PrismaService } from '../prisma/prisma.service'

function readInferredCountry(req: Request) {
  const cf = req.headers['cf-ipcountry']
  if (typeof cf === 'string' && /^[A-Z]{2}$/.test(cf) && cf !== 'XX') {
    return cf
  }
  return null
}

@Injectable()
export class TrackingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
  ) {}

  async ingestEvents(dto: TrackEventsDto, req: Request) {
    const visitorId = dto.visitorId.trim()
    const inferredCountry = readInferredCountry(req)
    let userId: string | null = null

    const profile: ApplicantProfile = {
      name: dto.name,
      locale: dto.locale,
      timezone: dto.timezone,
      inferredCountry,
      phoneCountryCode: dto.phoneCountryCode,
    }

    if (dto.email?.trim()) {
      const user = await this.users.ensureApplicantUser(dto.email, profile)
      userId = user.id
      await this.users.linkVisitorEvents(visitorId, user.id)
    }

    const enrichedEvents = dto.events.map((event) => {
      const payload = { ...(event.payload ?? {}) }

      if (event.name === 'session_start') {
        if (inferredCountry && payload.inferredCountry == null) {
          payload.inferredCountry = inferredCountry
        }
        const acceptLanguage = req.headers['accept-language']
        if (typeof acceptLanguage === 'string' && payload.acceptLanguage == null) {
          payload.acceptLanguage = acceptLanguage.split(',')[0]?.trim()
        }
      }

      return {
        userId,
        visitorId,
        eventName: event.name.trim(),
        path: event.path?.trim() || null,
        payload: payload as Prisma.InputJsonValue,
        occurredAt: event.occurredAt ? new Date(event.occurredAt) : new Date(),
      }
    })

    await this.prisma.userEvent.createMany({ data: enrichedEvents })

    return { ok: true as const, stored: dto.events.length, userId, inferredCountry }
  }
}
