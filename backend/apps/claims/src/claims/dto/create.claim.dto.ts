import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClaimDto {
  @ApiProperty({ example: 'abc123', description: 'User ID of claim owner' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'INS-5678', description: 'Policy Number' })
  @IsString()
  @IsNotEmpty()
  policyNumber: string;

  @ApiProperty({ example: 'Cargo damage', description: 'Claim Description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
