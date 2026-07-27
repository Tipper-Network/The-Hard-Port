import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateApplicationDto {
  @IsISO8601()
  submittedAt!: string

  @IsString()
  @MinLength(1)
  form!: string

  @IsString()
  @MinLength(1)
  version!: string

  @IsString()
  @MinLength(1)
  founderName!: string

  @IsString()
  @MinLength(1)
  businessName!: string

  @IsEmail()
  email!: string

  @IsOptional()
  @IsString()
  contactPhone?: string

  @IsString()
  @MinLength(1)
  coreOffer!: string

  @IsString()
  @MinLength(1)
  payingCustomers!: string

  @IsString()
  @MinLength(1)
  deliveryHistory!: string

  @IsString()
  @MinLength(1)
  operatingStatus!: string

  @IsString()
  @MinLength(1)
  founderContinuation!: string

  @IsOptional()
  @IsString()
  onlineActivity?: string

  @IsOptional()
  @IsString()
  primaryProblems?: string

  @IsOptional()
  @IsString()
  availableRecords?: string

  @IsString()
  @MinLength(1)
  discoverySource!: string

  @IsBoolean()
  willingnessExamine!: boolean

  @IsBoolean()
  willingnessEvidence!: boolean

  @IsBoolean()
  willingnessFeedback!: boolean

  @IsOptional()
  @IsString()
  crisisIndicators?: string

  @IsBoolean()
  privacyAck!: boolean

  @IsOptional()
  @IsString()
  @MinLength(8)
  visitorId?: string

  @IsOptional()
  @IsString()
  @MaxLength(35)
  locale?: string

  @IsOptional()
  @IsString()
  @MaxLength(80)
  timezone?: string

  @IsOptional()
  @IsString()
  @MaxLength(8)
  phoneCountryCode?: string
}
