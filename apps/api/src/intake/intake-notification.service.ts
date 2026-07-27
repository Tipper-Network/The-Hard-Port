import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

type ApplicationNotification = {
  id: string
  businessName: string
  founderName: string
  email: string
  discoverySource: string
}

@Injectable()
export class IntakeNotificationService {
  private readonly logger = new Logger(IntakeNotificationService.name)

  constructor(private readonly config: ConfigService) {}

  async notifyNewApplication(application: ApplicationNotification) {
    const apiKey = this.config.get<string>('RESEND_API_KEY')?.trim()
    const to = this.config.get<string>('INTAKE_NOTIFY_EMAIL')?.trim()

    if (!apiKey || !to) {
      this.logger.debug('Intake notification skipped — RESEND_API_KEY or INTAKE_NOTIFY_EMAIL not set')
      return
    }

    const from =
      this.config.get<string>('INTAKE_NOTIFY_FROM')?.trim() ??
      'THP Intake <onboarding@resend.dev>'
    const webAppUrl = this.config.get<string>('WEB_APP_URL')?.trim() ?? 'http://localhost:3000'
    const reviewUrl = `${webAppUrl.replace(/\/$/, '')}/review/${application.id}`

    const text = [
      'New THP Engagement Readiness Application',
      '',
      `Business: ${application.businessName}`,
      `Founder: ${application.founderName}`,
      `Email: ${application.email}`,
      `Discovery: ${application.discoverySource}`,
      `Application ID: ${application.id}`,
      '',
      `Review: ${reviewUrl}`,
      '',
      'Next action: Review application within 48h.',
    ].join('\n')

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: `THP application — ${application.businessName}`,
          text,
        }),
      })

      if (!res.ok) {
        const body = await res.text()
        this.logger.warn(`Intake notification failed (${res.status}): ${body}`)
      }
    } catch (err) {
      this.logger.warn(
        `Intake notification error: ${err instanceof Error ? err.message : 'unknown error'}`,
      )
    }
  }
}
