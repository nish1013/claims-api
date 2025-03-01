import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ClaimsService } from './claims.service';
import { Claim } from './schemas/claims.schema';
import { Model } from 'mongoose';
import { ClaimStatus } from './interfaces/claim.status';
import { createMockClaim } from './utils/mock-claim.util';

const createQueryMock = <T>(
  result: T,
): { exec: jest.Mock<Promise<T>, []> } => ({
  exec: jest.fn().mockResolvedValue(result),
});

const mockClaimModel: Partial<Model<Claim>> = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

describe('ClaimsService', () => {
  let service: ClaimsService;
  let model: Model<Claim>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        {
          provide: getModelToken(Claim.name),
          useValue: mockClaimModel,
        },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
    model = module.get<Model<Claim>>(getModelToken(Claim.name));
    jest.clearAllMocks();
  });

  describe('createClaim', () => {
    it('should create a claim and return ClaimDto', async () => {
      const mockClaim = createMockClaim();
      (model.create as jest.Mock).mockResolvedValueOnce(mockClaim);

      const result = await service.createClaim(mockClaim);

      expect(model.create).toHaveBeenCalledWith(mockClaim);
      expect(result).toEqual(mockClaim);
    });
  });

  describe('getAllClaims', () => {
    it('should return all claims as ClaimDto array', async () => {
      const claimsArray = [createMockClaim()];
      (model.find as jest.Mock).mockReturnValueOnce(
        createQueryMock(claimsArray),
      );

      const result = await service.getAllClaims();

      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual(claimsArray);
    });
  });

  describe('getClaimById', () => {
    it('should return a claim by ID as ClaimDto', async () => {
      const mockClaim = createMockClaim();
      (model.findById as jest.Mock).mockReturnValueOnce(
        createQueryMock(mockClaim),
      );

      const result = await service.getClaimById(mockClaim._id);

      expect(model.findById).toHaveBeenCalledWith(mockClaim._id);
      expect(result).toEqual(mockClaim);
    });
  });

  describe('updateClaim', () => {
    it('should update claim and return updated ClaimDto', async () => {
      const mockClaim = createMockClaim();
      const updateData = { status: ClaimStatus.APPROVED };
      const updatedClaim = { ...mockClaim, ...updateData };

      (model.findByIdAndUpdate as jest.Mock).mockReturnValueOnce(
        createQueryMock(updatedClaim),
      );

      const result = await service.updateClaim(mockClaim._id, updateData);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockClaim._id,
        updateData,
        { new: true },
      );
      expect(result).toEqual(updatedClaim);
    });
  });
});
