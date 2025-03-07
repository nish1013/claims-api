import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EvaluateClaimDto {
  @ApiProperty({ example: '12345', description: 'Unique Claim ID' })
  @IsString()
  @IsNotEmpty()
  claimId: string;

  @ApiProperty({ example: 'INS-6789', description: 'Policy Number' })
  @IsString()
  @IsNotEmpty()
  policyNumber: string;
}
