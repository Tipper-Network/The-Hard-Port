import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationPipelineDto } from './dto/update-application-pipeline.dto'
import { IntakeApplicantConfirmationService } from './intake-applicant-confirmation.service'
import { IntakeNotificationService } from './intake-notification.service'
import { IntakeWebhookService } from './intake-webhook.service'
import { applicationSelect } from './pipeline.constants'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class IntakeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: IntakeNotificationService,
    private readonly applicantConfirmation: IntakeApplicantConfirmationService,
    private readonly webhooks: IntakeWebhookService,
    private readonly users: UsersService,
  ) {}

  async createApplication(dto: CreateApplicationDto) {
    if (!dto.willingnessExamine || !dto.willingnessEvidence || !dto.willingnessFeedback) {
      throw new BadRequestException('All readiness confirmations are required')
    }

    if (!dto.privacyAck) {
      throw new BadRequestException('Privacy acknowledgment is required')
    }

    const email = dto.email.trim().toLowerCase()
    const applicant = await this.users.ensureApplicantUser(email, {
      name: dto.founderName,
      locale: dto.locale,
      timezone: dto.timezone,
      phoneCountryCode: dto.phoneCountryCode,
    })
    const visitorId = dto.visitorId?.trim()

    if (visitorId) {
      await this.users.linkVisitorEvents(visitorId, applicant.id)
    }

    const application = await this.prisma.application.create({
      data: {
        submittedAt: new Date(dto.submittedAt),
        form: dto.form,
        version: dto.version,
        founderName: dto.founderName.trim(),
        businessName: dto.businessName.trim(),
        email,
        userId: applicant.id,
        visitorId: visitorId || null,
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
        discoverySourceVideo: dto.discoverySourceVideo?.trim() || null,
        willingnessExamine: dto.willingnessExamine,
        willingnessEvidence: dto.willingnessEvidence,
        willingnessFeedback: dto.willingnessFeedback,
        crisisIndicators: dto.crisisIndicators?.trim() || null,
        privacyAck: dto.privacyAck,
        lifecycleStatus: 'application_submitted',
        nextAction: 'Review application within 48h',
      },
    })

    void this.notifications.notifyNewApplication({
      id: application.id,
      businessName: application.businessName,
      founderName: application.founderName,
      email: application.email,
      discoverySource: application.discoverySource,
    })

    void this.applicantConfirmation.sendApplicationReceived({
      id: application.id,
      businessName: application.businessName,
      founderName: application.founderName,
      email: application.email,
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
        qualificationResult: true,
        nextAction: true,
        activeCapacitySlot: true,
        assignedReviewer: true,
        createdAt: true,
      },
    })

    return { ok: true as const, applications }
  }

  async getApplication(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      select: applicationSelect,
    })

    if (!application) {
      throw new NotFoundException('Application not found')
    }

    return { ok: true as const, application }
  }

  async updateApplicationPipeline(id: string, dto: UpdateApplicationPipelineDto) {
    const existing = await this.prisma.application.findUnique({ where: { id } })
    if (!existing) {
      throw new NotFoundException('Application not found')
    }

    if (dto.activeCapacitySlot === true) {
      const otherActive = await this.prisma.application.findFirst({
        where: {
          activeCapacitySlot: true,
          id: { not: id },
        },
      })
      if (otherActive) {
        throw new BadRequestException(
          `Capacity slot already held by ${otherActive.businessName}. Clear it first.`,
        )
      }
    }

    const data: Record<string, unknown> = {}

    if (dto.lifecycleStatus !== undefined) data.lifecycleStatus = dto.lifecycleStatus
    if (dto.qualificationResult !== undefined) data.qualificationResult = dto.qualificationResult
    if (dto.maturityClassification !== undefined) data.maturityClassification = dto.maturityClassification
    if (dto.assignedReviewer !== undefined) data.assignedReviewer = dto.assignedReviewer
    if (dto.missingEvidence !== undefined) data.missingEvidence = dto.missingEvidence
    if (dto.nextAction !== undefined) data.nextAction = dto.nextAction
    if (dto.paymentStatus !== undefined) data.paymentStatus = dto.paymentStatus
    if (dto.activeCapacitySlot !== undefined) data.activeCapacitySlot = dto.activeCapacitySlot
    if (dto.notes !== undefined) data.notes = dto.notes
    if (dto.clientId !== undefined) data.clientId = dto.clientId

    const application = await this.prisma.application.update({
      where: { id },
      data,
      select: applicationSelect,
    })

    if (
      dto.lifecycleStatus !== undefined &&
      dto.lifecycleStatus !== existing.lifecycleStatus
    ) {
      void this.webhooks.notifyPipelineStageChange({
        applicationId: application.id,
        businessName: application.businessName,
        previousLifecycleStatus: existing.lifecycleStatus,
        lifecycleStatus: application.lifecycleStatus,
        qualificationResult: application.qualificationResult,
      })
    }

    return { ok: true as const, application }
  }
}
