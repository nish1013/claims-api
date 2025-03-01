import { Types } from 'mongoose';
import { ClaimDto } from '../dto/claim.dto';
import { ClaimStatus } from '../interfaces/claim.status';

export function createMockClaim(): ClaimDto {
  return {
    _id: new Types.ObjectId().toString(),
    userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    policyNumber: 'INS-ABC123',
    description: 'Sample claim description for testing',
    status: ClaimStatus.PENDING,
    documentUrls: ['https://res.cloudinary.com/xyz/document1.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
