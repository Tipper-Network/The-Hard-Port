import { BadRequestException, Injectable } from '@nestjs/common'

import { CreateApplicationDto } from './dto/create-application.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class IntakeService {
  constructor(private readonly prisma: PrismaService) {}

  async createApplication(dto: CreateApplicationDto) {
    if (!dto.willingnessExamine || !dto.willingnessEvidence || !dto.willingnessFeedback) {
      throw new BadRequestException('All readiness confirmations are required')
    }

    if (!dto.privacyAck) {
      throw new BadRequestException('Privacy acknowledgment is required')
    }

    const application = await this.prisma.application.create({
      data: {
        submittedAt: new Date(dto.submittedAt),
        form: dto.form,
        version: dto.version,
        founderName: dto.founderName.trim(),
        businessName: dto.businessName.trim(),
        email: dto.email.trim().toLowerCase(),
        contactPhone: dto.contactPhone?.trim() || null,
        coreOffer: dto.coreOffer.trim(),
        payingCustomers: dto.payingCustomers.trim(),
        deliveryHistory: dto.deliveryHistory.trim(),
        operatingStatus: dto.operatingStatus.trim(),
        founderContinuation: dto.founderContinuation.trim(),
        onlineActivity: dto.onlineActivity?.trim() || null,
        primaryProblems: dto.primaryProblems?.trim() || null,
        availableRecords: dto.availableRecords?.trim() || null,
        discoverySource: dto.discoverySource.trim(),
        willingnessExamine: dto.willingnessExamine,
        willingnessEvidence: dto.willingnessEvidence,
        willingnessFeedback: dto.willingnessFeedback,
        crisisIndicators: dto.crisisIndicators?.trim() || null,
        privacyAck: dto.privacyAck,
        lifecycleStatus: 'application_submitted',
      },
    })

    return {
      ok: true as const,
      id: application.id,
      lifecycleStatus: application.lifecycleStatus,
    }
  }

  async listApplications() {
    const applications = await this.prisma.application.findMany({
      orderBy: { submittedAt: 'desc' },
      select: {
        id: true,
        submittedAt: true,
        founderName: true,
        businessName: true,
        email: true,
        discoverySource: true,
        clientId: true,
        lifecycleStatus: true,
        createdAt: true,
      },
    })

    return { ok: true as const, applications }
  }
}
