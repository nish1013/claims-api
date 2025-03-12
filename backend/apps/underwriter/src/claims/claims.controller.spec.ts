import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { EvaluateClaimDto } from './dto/evaluate-claim.dto';
import { ClaimStatus } from './interfaces/claim.status';
import { CreateEvaluateClaimDto } from './dto/create-evaluate-claim.dto';

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let service: ClaimsService;

  const mockClaimsService = {
    processClaim: jest.fn().mockResolvedValue({ claimId: '12345', status: ClaimStatus.REVIEW }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [{ provide: ClaimsService, useValue: mockClaimsService }],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    service = module.get<ClaimsService>(ClaimsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process claim and return a review status', async () => {
    const dto: CreateEvaluateClaimDto = { claimId: '12345', policyNumber: 'INS-5678' };
    const result = await controller.evaluateClaim(dto);

    expect(result).toEqual({ claimId: '12345', status: ClaimStatus.REVIEW });
    expect(service.processClaim).toHaveBeenCalledWith('12345', 'INS-5678');
  });
});
