import { ClaimMapper } from './claim.mapper';
import { ClaimDto } from '../dto/claim.dto';
import { Claim } from '../schemas/claims.schema';
import { ClaimStatus } from '../interfaces/claim.status';
import { Types } from 'mongoose';

const createMockClaim = (): Claim =>
  ({
    _id: new Types.ObjectId() as any,
    userId: '123',
    policyNumber: 'ABC123',
    description: 'Test claim',
    status: ClaimStatus.PENDING,
  }) as Claim;

describe('ClaimMapper', () => {
  describe('toDto', () => {
    it('should map Claim to ClaimDto', () => {
      const mockClaim = createMockClaim();
      const result = ClaimMapper.toDto(mockClaim);

      expect(result).toBeInstanceOf(ClaimDto);
      expect(result._id).toBe(String(mockClaim._id));
      expect(result.userId).toBe(mockClaim.userId);
      expect(result.policyNumber).toBe(mockClaim.policyNumber);
      expect(result.description).toBe(mockClaim.description);
      expect(result.status).toBe(mockClaim.status);
    });
  });

  describe('toDtoList', () => {
    it('should map an array of Claims to an array of ClaimDto', () => {
      const mockClaims = [createMockClaim(), createMockClaim()];
      const result = ClaimMapper.toDtoList(mockClaims);

      expect(result).toHaveLength(mockClaims.length);
      result.forEach((dto, index) => {
        expect(dto).toBeInstanceOf(ClaimDto);
        expect(dto._id).toBe(String(mockClaims[index]._id));
        expect(dto.userId).toBe(mockClaims[index].userId);
        expect(dto.policyNumber).toBe(mockClaims[index].policyNumber);
        expect(dto.description).toBe(mockClaims[index].description);
        expect(dto.status).toBe(mockClaims[index].status);
      });
    });
  });
});
