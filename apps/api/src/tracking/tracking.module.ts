import { Module } from '@nestjs/common'

import { TrackingAnalyticsService } from './tracking-analytics.service'
import { TrackingController } from './tracking.controller'
import { TrackingExportService } from './tracking-export.service'
import { TrackingService } from './tracking.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [TrackingController],
  providers: [TrackingService, TrackingAnalyticsService, TrackingExportService],
  exports: [TrackingService, TrackingAnalyticsService, TrackingExportService],
})
export class TrackingModule {}
