import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ClaimStatus } from './interfaces/claim.status';
import { EvaluateClaimDto } from './dto/evaluate-claim.dto';

@Injectable()
export class ClaimsService {
  private readonly logger = new Logger(ClaimsService.name);
  private readonly webhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.webhookUrl = this.configService.get<string>('WEBHOOK_URL', '');
  }

  /**
   * Processes a claim, evaluates it immediately, and schedules webhook notification.
   */
  async processClaim(claimId: string, policyNumber: string): Promise<EvaluateClaimDto> {
    this.logger.log(`Received claim ${claimId}, processing underwriting decision.`);

    const decision = this.underwrite(policyNumber);
    this.logger.log(`Claim ${claimId} decision: ${decision}`);

    setTimeout(() => this.sendWebhookNotification(claimId, decision), this.getRandomDelay());

    return { claimId, status: ClaimStatus.REVIEW };
  }

  /**
   * Determines underwriting decision based on last digit of policy number for demo purpose.
   */
  private underwrite(policyNumber: string): ClaimStatus {
    const lastDigit = parseInt(policyNumber.slice(-1), 10);
    return lastDigit % 2 === 0 ? ClaimStatus.APPROVED : ClaimStatus.REJECTED;
  }

  /**
   * Sends underwriting result to a webhook.
   */
  private async sendWebhookNotification(claimId: string, decision: ClaimStatus) {
    if (!this.webhookUrl) {
      this.logger.warn('Skipping webhook: No URL provided.');
      return;
    }

    try {
      await axios.post(this.webhookUrl, { claimId, decision });
      this.logger.log(`Webhook sent for claim ${claimId} with status ${decision}`);
    } catch (error) {
      this.logger.error(`Webhook failed: ${error.message}`);
    }
  }

  /**
   * Generates a random delay between 1-5 seconds for webhook notification.
   */
  private getRandomDelay(): number {
    return Math.floor(Math.random() * 5000) + 1000; // 1000ms to 5000ms (1-5 seconds)
  }
}
