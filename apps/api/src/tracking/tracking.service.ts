import { Injectable } from '@nestjs/common'
import { Prisma } from '../generated/prisma/client'

import { TrackEventsDto } from './dto/track-events.dto'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TrackingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
  ) {}

  async ingestEvents(dto: TrackEventsDto) {
    const visitorId = dto.visitorId.trim()
    let userId: string | null = null

    if (dto.email?.trim()) {
      const user = await this.users.ensureApplicantUser(dto.email, dto.name)
      userId = user.id
      await this.users.linkVisitorEvents(visitorId, user.id)
    }

    await this.prisma.userEvent.createMany({
      data: dto.events.map((event) => ({
        userId,
        visitorId,
        eventName: event.name.trim(),
        path: event.path?.trim() || null,
        payload: (event.payload ?? {}) as Prisma.InputJsonValue,
        occurredAt: event.occurredAt ? new Date(event.occurredAt) : new Date(),
      })),
    })

    return { ok: true as const, stored: dto.events.length, userId }
  }
}
