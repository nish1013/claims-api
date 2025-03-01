import { ApiProperty } from '@nestjs/swagger';
import { ClaimStatus } from '../interfaces/claim.status';
import { IsString, Matches, IsUUID } from 'class-validator';

export class ClaimDto {
  @ApiProperty({
    example: '65d4f1c3-b12a-4e9b-9d6f-7e2af2ab1234',
    description: 'User ID of claim owner (UUID)',
  })
  @IsUUID('4', { message: 'userId must be a valid UUID (version 4).' })
  userId: string;

  @ApiProperty({
    example: 'INS-12345',
    description:
      'Policy number must start with "INS-" and be followed by up to 20 alphanumeric characters.',
  })
  @IsString()
  @Matches(/^INS-[A-Za-z0-9]{1,20}$/, {
    message:
      'policyNumber must start with "INS-" and be followed by up to 20 alphanumeric characters.',
  })
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

  @ApiProperty({
    example: '65d4f1c3b12a3e9b9d6f7e2a',
    description: 'Claim ID',
  })
  _id: string;
}
