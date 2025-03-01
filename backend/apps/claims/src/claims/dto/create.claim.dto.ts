import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ClaimDto } from './claim.dto';

export class CreateClaimDto extends PickType(ClaimDto, [
  'userId',
  'policyNumber',
  'description',
] as const) {}
