import { Injectable, Logger } from '@nestjs/common'

type PipelineStageChange = {
  applicationId: string
  businessName: string
  previousLifecycleStatus: string
  lifecycleStatus: string
  qualificationResult?: string | null
}

/**
 * TODO(scaffold): outbound webhooks on pipeline stage change.
 * Ops doc: the-hard-port-os/operations/launch-scaffold/P03-intake-ops-loop.md
 */
@Injectable()
export class IntakeWebhookService {
  private readonly logger = new Logger(IntakeWebhookService.name)

  async notifyPipelineStageChange(_change: PipelineStageChange) {
    const webhookUrl = process.env.INTAKE_PIPELINE_WEBHOOK_URL?.trim()

    if (!webhookUrl) {
      this.logger.debug('Pipeline webhook skipped — INTAKE_PIPELINE_WEBHOOK_URL not set')
      return
    }

    // TODO(scaffold): POST signed payload to webhookUrl
    this.logger.debug(`Pipeline webhook stub — would POST to ${webhookUrl}`)
  }
}
