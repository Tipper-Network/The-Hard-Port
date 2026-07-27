import { Injectable } from '@nestjs/common'
import { UserRole } from '../generated/prisma/client'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Applicant profile — created on first email capture; never downgrades operator roles. */
  async ensureApplicantUser(email: string, name?: string | null) {
    const normalized = email.trim().toLowerCase()
    const existing = await this.prisma.user.findUnique({ where: { email: normalized } })

    if (existing) {
      if (existing.role !== UserRole.user) {
        return existing
      }

      if (name?.trim()) {
        return this.prisma.user.update({
          where: { id: existing.id },
          data: { name: name.trim() },
        })
      }

      return existing
    }

    return this.prisma.user.create({
      data: {
        email: normalized,
        name: name?.trim() || null,
        role: UserRole.user,
      },
    })
  }

  async linkVisitorEvents(visitorId: string, userId: string) {
    await this.prisma.userEvent.updateMany({
      where: { visitorId, userId: null },
      data: { userId },
    })
  }
}
