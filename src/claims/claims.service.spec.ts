import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ClaimsService } from './claims.service';
import { Claim } from './schemas/claims.schema';
import { Model, Types } from 'mongoose';
import { ClaimStatus } from './interfaces/claim.status';

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

  describe('getClaimById', () => {
    it('should return a claim by ID', async () => {
      const mockClaim = createMockClaim();
      (model.findById as jest.Mock).mockReturnValueOnce(
        createQueryMock(mockClaim),
      );

      const result = await service.getClaimById(mockClaim._id.toString());
      expect(model.findById).toHaveBeenCalledWith(mockClaim._id.toString());
      expect(result).toEqual(mockClaim);
    });
  });

  describe('updateClaimStatus', () => {
    it('should update claim status', async () => {
      const mockClaim = createMockClaim();
      const newStatus = 'approved';
      const updatedClaim = { ...mockClaim, status: newStatus };

      (model.findByIdAndUpdate as jest.Mock).mockReturnValueOnce(
        createQueryMock(updatedClaim),
      );

      const result = await service.updateClaimStatus(
        mockClaim._id.toString(),
        newStatus,
      );
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockClaim._id.toString(),
        { status: newStatus },
        { new: true },
      );
      expect(result).toEqual(updatedClaim);
    });
  });
});
