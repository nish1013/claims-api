import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { ConfigService } from '@nestjs/config';
import { ClaimStatus } from './interfaces/claim.status';

jest.useFakeTimers();

describe('ClaimsService', () => {
  let service: ClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimsService, ConfigService],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should determine correct underwriting decision', () => {
    expect(service['underwrite']('INS-5678')).toBe(ClaimStatus.APPROVED);
    expect(service['underwrite']('INS-1235')).toBe(ClaimStatus.REJECTED);
  });

  it('should schedule webhook notification', async () => {
    const spy = jest.spyOn(service as any, 'sendWebhookNotification');

    await service.processClaim('claim-001', 'INS-5678');

    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
  });
});
