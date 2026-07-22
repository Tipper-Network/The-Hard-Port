import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator'

import { LIFECYCLE_STATUSES, QUALIFICATION_RESULTS } from '../pipeline.constants'

export class UpdateApplicationPipelineDto {
  @IsOptional()
  @IsIn([...LIFECYCLE_STATUSES])
  lifecycleStatus?: string

  @IsOptional()
  @IsIn([...QUALIFICATION_RESULTS])
  qualificationResult?: string | null

  @IsOptional()
  @IsString()
  maturityClassification?: string | null

  @IsOptional()
  @IsString()
  assignedReviewer?: string | null

  @IsOptional()
  @IsString()
  missingEvidence?: string | null

  @IsOptional()
  @IsString()
  nextAction?: string | null

  @IsOptional()
  @IsString()
  paymentStatus?: string | null

  @IsOptional()
  @IsBoolean()
  activeCapacitySlot?: boolean

  @IsOptional()
  @IsString()
  notes?: string | null

  @IsOptional()
  @IsString()
  @MinLength(1)
  clientId?: string | null
}
