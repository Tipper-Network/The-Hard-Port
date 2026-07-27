import { Module } from '@nestjs/common'

import { IntakeController } from './intake.controller'
import { IntakeNotificationService } from './intake-notification.service'
import { IntakeService } from './intake.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [IntakeController],
  providers: [IntakeService, IntakeNotificationService],
})
export class IntakeModule {}
