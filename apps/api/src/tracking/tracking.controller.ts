import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import type { Request } from 'express'

import { JwtAuthGuard } from '../auth/guards/auth.guards'
import { ReviewerGuard } from '../auth/guards/reviewer.guard'
import { TrackEventsDto } from './dto/track-events.dto'
import { TrackingAnalyticsService } from './tracking-analytics.service'
import { TrackingExportService } from './tracking-export.service'
import { TrackingService } from './tracking.service'

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly tracking: TrackingService,
    private readonly analytics: TrackingAnalyticsService,
    private readonly exportService: TrackingExportService,
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

  /** TODO(scaffold): TRACKING-ROADMAP §7.4 — returns header-only CSV until implemented */
  @Get('funnel/export')
  @UseGuards(JwtAuthGuard, ReviewerGuard)
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="funnel-export-stub.csv"')
  funnelExport(@Query('days') days?: string) {
    const parsed = days ? Number.parseInt(days, 10) : 30
    return this.exportService.buildFunnelCsvStub(Number.isFinite(parsed) ? parsed : 30)
  }
}
