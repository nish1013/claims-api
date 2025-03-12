import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { ClaimStatus } from './interfaces/claim.status';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('ClaimsService', () => {
  let service: ClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimsService],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
  });

  it('should use the correct webhook URL from .env.test', () => {
    expect(process.env.WEBHOOK_URL).toBe('http://mock-webhook.com');
  });

  it('should process a claim and return review status', async () => {
    const result = await service.processClaim('123', 'INS-5678');
    expect(result).toEqual({ claimId: '123', status: ClaimStatus.REVIEW });
  });

  it('should determine correct underwriting decision', () => {
    expect(service['underwrite']('INS-5678')).toBe(ClaimStatus.APPROVED);
    expect(service['underwrite']('INS-1234')).toBe(ClaimStatus.REJECTED);
  });
});
