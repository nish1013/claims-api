import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ClaimStatus } from '../interfaces/claim.status';

export class UpdateClaimDto {
  @ApiPropertyOptional({ example: 'Updated description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'approved', enum: ClaimStatus })
  @IsEnum(ClaimStatus)
  @IsOptional()
  status?: ClaimStatus;
}
