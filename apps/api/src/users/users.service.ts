import { Injectable } from '@nestjs/common'
import { UserRole } from '../generated/prisma/client'

import { PrismaService } from '../prisma/prisma.service'

export type ApplicantProfile = {
  name?: string | null
  locale?: string | null
  timezone?: string | null
  inferredCountry?: string | null
  phoneCountryCode?: string | null
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Applicant profile — created on first email capture; never downgrades operator roles. */
  async ensureApplicantUser(email: string, profile?: ApplicantProfile) {
    const normalized = email.trim().toLowerCase()
    const existing = await this.prisma.user.findUnique({ where: { email: normalized } })

    if (existing) {
      if (existing.role !== UserRole.user) {
        return existing
      }
      return this.updateApplicantProfile(existing.id, profile ?? {})
    }

    return this.prisma.user.create({
      data: {
        email: normalized,
        name: profile?.name?.trim() || null,
        role: UserRole.user,
        locale: profile?.locale?.trim() || null,
        timezone: profile?.timezone?.trim() || null,
        inferredCountry: profile?.inferredCountry?.trim() || null,
        phoneCountryCode: profile?.phoneCountryCode?.trim() || null,
      },
    })
  }

  async updateApplicantProfile(userId: string, profile: ApplicantProfile) {
    const data: Record<string, string | null> = {}

    if (profile.name?.trim()) data.name = profile.name.trim()
    if (profile.locale?.trim()) data.locale = profile.locale.trim()
    if (profile.timezone?.trim()) data.timezone = profile.timezone.trim()
    if (profile.inferredCountry?.trim()) data.inferredCountry = profile.inferredCountry.trim()
    if (profile.phoneCountryCode?.trim()) data.phoneCountryCode = profile.phoneCountryCode.trim()

    if (Object.keys(data).length === 0) {
      return this.prisma.user.findUniqueOrThrow({ where: { id: userId } })
    }

    return this.prisma.user.update({ where: { id: userId }, data })
  }

  async linkVisitorEvents(visitorId: string, userId: string) {
    await this.prisma.userEvent.updateMany({
      where: { visitorId, userId: null },
      data: { userId },
    })
  }
}
