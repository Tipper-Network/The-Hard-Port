import { Module } from '@nestjs/common'

import { TrackingController } from './tracking.controller'
import { TrackingService } from './tracking.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
