import { Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '../generated/prisma/client'

import { PrismaService } from '../prisma/prisma.service'

type JsonPayload = Prisma.JsonValue

function payloadRecord(payload: JsonPayload): Record<string, unknown> {
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return payload as Record<string, unknown>
  }
  return {}
}

function readNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

@Injectable()
export class TrackingAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFunnelSummary(days = 30) {
    const periodDays = Math.min(Math.max(days, 1), 90)
    const since = new Date(Date.now() - periodDays * 86_400_000)

    const grouped = await this.prisma.userEvent.groupBy({
      by: ['eventName'],
      _count: { _all: true },
      where: { occurredAt: { gte: since } },
    })

    const counts = Object.fromEntries(
      grouped.map((row) => [row.eventName, row._count._all]),
    ) as Record<string, number>

    const sectionEvents = await this.prisma.userEvent.findMany({
      where: { eventName: 'section_view', occurredAt: { gte: since } },
      select: { payload: true },
    })

    const sectionReach = new Map<string, { sectionId: string; rung: number; views: number }>()
    for (const event of sectionEvents) {
      const payload = payloadRecord(event.payload)
      const sectionId = readString(payload.sectionId)
      const rung = readNumber(payload.rung)
      if (!sectionId || rung == null) continue
      const key = `${rung}:${sectionId}`
      const existing = sectionReach.get(key)
      if (existing) {
        existing.views += 1
      } else {
        sectionReach.set(key, { sectionId, rung, views: 1 })
      }
    }

    const formStepEvents = await this.prisma.userEvent.findMany({
      where: {
        eventName: { in: ['form_step_view', 'form_step_complete', 'form_abandon'] },
        occurredAt: { gte: since },
      },
      select: { eventName: true, payload: true },
    })

    const formSteps = new Map<
      string,
      { step: string; views: number; completes: number; abandons: number }
    >()

    for (const event of formStepEvents) {
      const payload = payloadRecord(event.payload)
      if (event.eventName === 'form_abandon') {
        const step = readString(payload.lastStep) ?? 'unknown'
        const row = formSteps.get(step) ?? { step, views: 0, completes: 0, abandons: 0 }
        row.abandons += 1
        formSteps.set(step, row)
        continue
      }

      const step = readString(payload.step)
      if (!step) continue
      const row = formSteps.get(step) ?? { step, views: 0, completes: 0, abandons: 0 }
      if (event.eventName === 'form_step_view') row.views += 1
      if (event.eventName === 'form_step_complete') row.completes += 1
      formSteps.set(step, row)
    }

    const applyViews = counts.application_view ?? 0
    const applySubmits = counts.application_submit ?? 0

    return {
      ok: true as const,
      periodDays,
      totals: {
        sessions: counts.session_start ?? 0,
        pageViews: counts.page_view ?? 0,
        applyViews,
        applySubmits,
        formAbandons: counts.form_abandon ?? 0,
        ctaClicks: counts.cta_click ?? 0,
      },
      conversion: {
        applyOpenRate: applyViews > 0 ? applySubmits / applyViews : null,
        sessionToApply: (counts.session_start ?? 0) > 0 ? applyViews / (counts.session_start ?? 1) : null,
      },
      sectionReach: [...sectionReach.values()].sort((a, b) => a.rung - b.rung),
      formSteps: [...formSteps.values()],
      topEvents: grouped
        .map((row) => ({ eventName: row.eventName, count: row._count._all }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12),
    }
  }

  async getApplicationJourney(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: {
        id: true,
        email: true,
        submittedAt: true,
        userId: true,
        visitorId: true,
        user: {
          select: {
            locale: true,
            timezone: true,
            inferredCountry: true,
            phoneCountryCode: true,
          },
        },
      },
    })

    if (!application) {
      throw new NotFoundException('Application not found')
    }

    const filters: Prisma.UserEventWhereInput[] = []
    if (application.userId) filters.push({ userId: application.userId })
    if (application.visitorId) filters.push({ visitorId: application.visitorId })

    if (filters.length === 0) {
      return {
        ok: true as const,
        applicationId: application.id,
        profile: application.user,
        summary: {
          eventCount: 0,
          maxRung: 0,
          lastFormStep: null,
          submitted: true,
          abandoned: false,
        },
        events: [],
      }
    }

    const events = await this.prisma.userEvent.findMany({
      where: { OR: filters },
      orderBy: { occurredAt: 'asc' },
      take: 200,
      select: {
        id: true,
        eventName: true,
        path: true,
        payload: true,
        occurredAt: true,
      },
    })

    let maxRung = 0
    let lastFormStep: string | null = null
    let submitted = false
    let abandoned = false

    for (const event of events) {
      const payload = payloadRecord(event.payload)
      if (event.eventName === 'section_view') {
        const rung = readNumber(payload.rung)
        if (rung != null) maxRung = Math.max(maxRung, rung)
      }
      if (event.eventName === 'form_step_view') {
        lastFormStep = readString(payload.step) ?? lastFormStep
      }
      if (event.eventName === 'application_submit') submitted = true
      if (event.eventName === 'form_abandon') {
        abandoned = true
        lastFormStep = readString(payload.lastStep) ?? lastFormStep
      }
    }

    return {
      ok: true as const,
      applicationId: application.id,
      userId: application.userId,
      visitorId: application.visitorId,
      profile: application.user,
      summary: {
        eventCount: events.length,
        maxRung,
        lastFormStep,
        submitted,
        abandoned: abandoned && !submitted,
      },
      events: events.map((event) => ({
        id: event.id,
        eventName: event.eventName,
        path: event.path,
        payload: payloadRecord(event.payload),
        occurredAt: event.occurredAt.toISOString(),
      })),
    }
  }
}
