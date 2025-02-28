import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { Claim } from './schemas/claims.schema';
import { ClaimStatus } from './interfaces/claim.status';
import { Types } from 'mongoose';

const createMockClaim = (): Partial<Claim> & {
  _id: Types.ObjectId;
  save: jest.Mock;
} => ({
  _id: new Types.ObjectId(),
  userId: '123',
  policyNumber: 'ABC123',
  description: 'Test claim',
  status: ClaimStatus.PENDING,
  save: jest.fn().mockResolvedValue(true),
});

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let claimsService: ClaimsService;

  const mockClaimsService = {
    createClaim: jest.fn(),
    getAllClaims: jest.fn(),
    getClaimById: jest.fn(),
    updateClaimStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [
        {
          provide: ClaimsService,
          useValue: mockClaimsService,
        },
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    claimsService = module.get<ClaimsService>(ClaimsService);
    jest.clearAllMocks();
  });

  describe('createClaim', () => {
    it('should call createClaim on the service with claim data and return the result', async () => {
      const claimData = createMockClaim();
      mockClaimsService.createClaim.mockResolvedValueOnce(claimData);

      const result = await controller.createClaim(claimData);

      expect(mockClaimsService.createClaim).toHaveBeenCalledWith(claimData);
      expect(result).toEqual(claimData);
    });
  });

  describe('getAllClaims', () => {
    it('should return all claims', async () => {
      const claimsArray = [createMockClaim()];
      mockClaimsService.getAllClaims.mockResolvedValueOnce(claimsArray);

      const result = await controller.getAllClaims();

      expect(mockClaimsService.getAllClaims).toHaveBeenCalled();
      expect(result).toEqual(claimsArray);
    });
  });

  describe('getClaimById', () => {
    it('should return a claim by ID', async () => {
      const claim = createMockClaim();
      mockClaimsService.getClaimById.mockResolvedValueOnce(claim);

      const result = await controller.getClaimById(claim._id.toString());

      expect(mockClaimsService.getClaimById).toHaveBeenCalledWith(
        claim._id.toString(),
      );
      expect(result).toEqual(claim);
    });
  });

  describe('updateClaimStatus', () => {
    it('should update claim status', async () => {
      const claim = createMockClaim();
      const newStatus = ClaimStatus.APPROVED;
      const updatedClaim = { ...claim, status: newStatus };
      mockClaimsService.updateClaimStatus.mockResolvedValueOnce(updatedClaim);

      const result = await controller.updateClaimStatus(
        claim._id.toString(),
        newStatus,
      );

      expect(mockClaimsService.updateClaimStatus).toHaveBeenCalledWith(
        claim._id.toString(),
        newStatus,
      );
      expect(result).toEqual(updatedClaim);
    });
  });
});
