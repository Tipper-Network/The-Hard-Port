import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/auth.guards'
import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationPipelineDto } from './dto/update-application-pipeline.dto'
import { IntakeService } from './intake.service'

@Controller('intake')
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  @Get('health')
  health() {
    return { ok: true, service: 'thp-api' }
  }

  @Post('applications')
  createApplication(@Body() dto: CreateApplicationDto) {
    return this.intakeService.createApplication(dto)
  }

  @Get('applications')
  @UseGuards(JwtAuthGuard)
  listApplications() {
    return this.intakeService.listApplications()
  }

  @Get('applications/:id')
  @UseGuards(JwtAuthGuard)
  getApplication(@Param('id') id: string) {
    return this.intakeService.getApplication(id)
  }

  @Patch('applications/:id')
  @UseGuards(JwtAuthGuard)
  updateApplicationPipeline(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationPipelineDto,
  ) {
    return this.intakeService.updateApplicationPipeline(id, dto)
  }
}
