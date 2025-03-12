import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClaimStatus } from '../interfaces/claim.status';

export class EvaluateClaimDto {
  @ApiProperty({ example: '12345', description: 'Unique Claim ID' })
  @IsString()
  @IsNotEmpty()
  claimId: string;

  @ApiProperty({ example: 'review', description: 'Claims status' })
  @IsString()
  @IsNotEmpty()
  status: ClaimStatus;
}
