import { Module } from '@nestjs/common'

import { IntakeApplicantConfirmationService } from './intake-applicant-confirmation.service'
import { IntakeController } from './intake.controller'
import { IntakeNotificationService } from './intake-notification.service'
import { IntakeWebhookService } from './intake-webhook.service'
import { IntakeService } from './intake.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [IntakeController],
  providers: [
    IntakeService,
    IntakeNotificationService,
    IntakeApplicantConfirmationService,
    IntakeWebhookService,
  ],
})
export class IntakeModule {}
