import { Body, Controller, Post, Req } from '@nestjs/common'
import type { Request } from 'express'

import { TrackEventsDto } from './dto/track-events.dto'
import { TrackingService } from './tracking.service'

@Controller('tracking')
export class TrackingController {
  constructor(private readonly tracking: TrackingService) {}

  @Post('events')
  ingestEvents(@Body() dto: TrackEventsDto, @Req() req: Request) {
    return this.tracking.ingestEvents(dto, req)
  }
}
