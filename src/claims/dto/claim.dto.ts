import { ApiProperty } from '@nestjs/swagger';
import { ClaimStatus } from '../interfaces/claim.status';

export class ClaimDto {
  @ApiProperty({ example: '65d4f1c3b12a3e9b9d6f7e2a', description: 'Claim ID' })
  _id: string;

  @ApiProperty({ example: '12345', description: 'User ID' })
  userId: string;

  @ApiProperty({ example: 'INS-5678', description: 'Policy Number' })
  policyNumber: string;

  @ApiProperty({ example: 'Cargo damage', description: 'Claim Description' })
  description: string;

  @ApiProperty({
    example: 'pending',
    enum: ClaimStatus,
    description: 'Claim Status',
  })
  status: string;

  constructor(partial: Partial<ClaimDto>) {
    Object.assign(this, partial);
  }
}
