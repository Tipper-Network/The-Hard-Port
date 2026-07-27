import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import type { Request } from 'express'

import { JwtAuthGuard } from '../auth/guards/auth.guards'
import { ReviewerGuard } from '../auth/guards/reviewer.guard'
import { TrackEventsDto } from './dto/track-events.dto'
import { TrackingAnalyticsService } from './tracking-analytics.service'
import { TrackingService } from './tracking.service'

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly tracking: TrackingService,
    private readonly analytics: TrackingAnalyticsService,
  ) {}

  @Post('events')
  ingestEvents(@Body() dto: TrackEventsDto, @Req() req: Request) {
    return this.tracking.ingestEvents(dto, req)
  }

  @Get('funnel/summary')
  @UseGuards(JwtAuthGuard, ReviewerGuard)
  funnelSummary(@Query('days') days?: string) {
    const parsed = days ? Number.parseInt(days, 10) : 30
    return this.analytics.getFunnelSummary(Number.isFinite(parsed) ? parsed : 30)
  }

  @Get('applications/:applicationId/journey')
  @UseGuards(JwtAuthGuard, ReviewerGuard)
  applicationJourney(@Param('applicationId') applicationId: string) {
    return this.analytics.getApplicationJourney(applicationId)
  }
}
