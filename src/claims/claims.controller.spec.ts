import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { ClaimDto } from './dto/claim.dto';
import { CreateClaimDto } from './dto/create.claim.dto';
import { UpdateClaimDto } from './dto/update.claim.dto';
import { ClaimStatus } from './interfaces/claim.status';
import { Types } from 'mongoose';

const createMockClaim = (): ClaimDto => {
  return new ClaimDto({
    _id: new Types.ObjectId().toString(),
    userId: '123',
    policyNumber: 'ABC123',
    description: 'Test claim',
    status: ClaimStatus.PENDING,
  });
};

const mockClaimsService = {
  createClaim: jest.fn(),
  getAllClaims: jest.fn(),
  getClaimById: jest.fn(),
  updateClaim: jest.fn(),
};

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let claimsService: ClaimsService;

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
    it('should create a new claim and return ClaimDto', async () => {
      const claimData = new CreateClaimDto();
      claimData.userId = '123';
      claimData.policyNumber = 'ABC123';
      claimData.description = 'Test claim';

      const createdClaim = createMockClaim();
      mockClaimsService.createClaim.mockResolvedValueOnce(createdClaim);

      const result = await controller.createClaim(claimData);

      expect(mockClaimsService.createClaim).toHaveBeenCalledWith(claimData);
      expect(result).toEqual(createdClaim);
    });
  });

  describe('getAllClaims', () => {
    it('should return all claims as ClaimDto array', async () => {
      const claimsArray = [createMockClaim()];
      mockClaimsService.getAllClaims.mockResolvedValueOnce(claimsArray);

      const result = await controller.getAllClaims();

      expect(mockClaimsService.getAllClaims).toHaveBeenCalled();
      expect(result).toEqual(claimsArray);
    });
  });

  describe('getClaimById', () => {
    it('should return a claim by ID as ClaimDto', async () => {
      const claim = createMockClaim();
      mockClaimsService.getClaimById.mockResolvedValueOnce(claim);

      const result = await controller.getClaimById(claim._id);

      expect(mockClaimsService.getClaimById).toHaveBeenCalledWith(claim._id);
      expect(result).toEqual(claim);
    });
  });

  describe('updateClaim', () => {
    it('should update a claim and return updated ClaimDto', async () => {
      const claim = createMockClaim();
      const updateData = new UpdateClaimDto();
      updateData.status = ClaimStatus.APPROVED;

      const updatedClaim = { ...claim, status: updateData.status };
      mockClaimsService.updateClaim.mockResolvedValueOnce(updatedClaim);

      const result = await controller.updateClaim(claim._id, updateData);

      expect(mockClaimsService.updateClaim).toHaveBeenCalledWith(
        claim._id,
        updateData,
      );
      expect(result).toEqual(updatedClaim);
    });
  });
});
