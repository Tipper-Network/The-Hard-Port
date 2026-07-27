import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

type ApplicantConfirmationPayload = {
  id: string
  businessName: string
  founderName: string
  email: string
}

/**
 * TODO(scaffold): P04 — applicant confirmation email.
 * Ops doc: the-hard-port-os/operations/launch-scaffold/P04-applicant-confirmation-email.md
 */
@Injectable()
export class IntakeApplicantConfirmationService {
  private readonly logger = new Logger(IntakeApplicantConfirmationService.name)

  constructor(private readonly config: ConfigService) {}

  async sendApplicationReceived(application: ApplicantConfirmationPayload) {
    const apiKey = this.config.get<string>('RESEND_API_KEY')?.trim()
    const from = this.config.get<string>('INTAKE_APPLICANT_FROM')?.trim()

    if (!apiKey || !from) {
      this.logger.debug(
        'Applicant confirmation skipped — RESEND_API_KEY or INTAKE_APPLICANT_FROM not set',
      )
      return
    }

    // TODO(scaffold): replace with final copy + HTML template
    const subject = `THP application received — ${application.businessName}`
    const text = [
      `Hi ${application.founderName},`,
      '',
      '_fill — what happens next, 48h review window, no guarantee language_',
      '',
      `Application ID: ${application.id}`,
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
          to: [application.email],
          subject,
          text,
        }),
      })

      if (!res.ok) {
        const body = await res.text()
        this.logger.warn(`Applicant confirmation failed (${res.status}): ${body}`)
      }
    } catch (err) {
      this.logger.warn(
        `Applicant confirmation error: ${err instanceof Error ? err.message : 'unknown error'}`,
      )
    }
  }
}
