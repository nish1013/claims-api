import { ApiProperty } from '@nestjs/swagger';
import { ClaimStatus } from '../interfaces/claim.status';

export class ClaimDto {
  @ApiProperty({ example: '65d4f1c3b12a3e9b9d6f7e2a', description: 'Claim ID' })
  _id: string;

  @ApiProperty({ example: 'abc123', description: 'User ID of claim owner' })
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
  status: ClaimStatus;

  @ApiProperty({
    example: ['https://res.cloudinary.com/xyz/document1.pdf'],
    description: 'Claim document URLs',
  })
  documentUrls: string[];

  @ApiProperty({
    example: '2025-03-01T14:00:00.000Z',
    description: 'Claim creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-03-01T14:05:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  constructor(partial: Partial<ClaimDto>) {
    Object.assign(this, partial);
  }
}
