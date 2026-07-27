import { Module } from '@nestjs/common'

import { TrackingAnalyticsService } from './tracking-analytics.service'
import { TrackingController } from './tracking.controller'
import { TrackingService } from './tracking.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [TrackingController],
  providers: [TrackingService, TrackingAnalyticsService],
  exports: [TrackingService, TrackingAnalyticsService],
})
export class TrackingModule {}
