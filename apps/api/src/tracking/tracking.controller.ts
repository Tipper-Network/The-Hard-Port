import { Body, Controller, Post } from '@nestjs/common'

import { TrackEventsDto } from './dto/track-events.dto'
import { TrackingService } from './tracking.service'

@Controller('tracking')
export class TrackingController {
  constructor(private readonly tracking: TrackingService) {}

  @Post('events')
  ingestEvents(@Body() dto: TrackEventsDto) {
    return this.tracking.ingestEvents(dto)
  }
}
