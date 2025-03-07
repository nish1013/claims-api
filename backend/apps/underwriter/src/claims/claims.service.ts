import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ClaimStatus } from './interfaces/claim.status';

@Injectable()
export class ClaimsService {
  private readonly logger = new Logger(ClaimsService.name);
  private readonly webhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.webhookUrl = this.configService.get<string>('WEBHOOK_URL', '');
  }

  /**
   * Processes a claim and schedules underwriting evaluation.
   */
  async processClaim(claimId: string, policyNumber: string) {
    this.logger.log(`Received claim ${claimId}, scheduling underwriting`);

    // Schedule underwriting decision with random delay (1 to 5 seconds)
    setTimeout(() => this.evaluateClaim(claimId, policyNumber), this.getRandomDelay());

    return { claimId, status: ClaimStatus.REVIEW };
  }

  /**
   * Evaluates claim and sends result via webhook.
   */
  private async evaluateClaim(claimId: string, policyNumber: string) {
    const decision = this.underwrite(policyNumber);
    this.logger.log(`Claim ${claimId} decision: ${decision}`);

    if (this.webhookUrl) {
      await this.notifyWebhook(claimId, decision);
    }
  }

  /**
   * Determines underwriting decision based on last digit of policy number.
   */
  private underwrite(policyNumber: string): ClaimStatus {
    const lastDigit = parseInt(policyNumber.slice(-1), 10);
    return lastDigit % 2 === 0 ? ClaimStatus.APPROVED : ClaimStatus.REJECTED;
  }

  /**
   * Sends underwriting result to a webhook.
   */
  private async notifyWebhook(claimId: string, decision: ClaimStatus) {
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
   * Generates a random delay between 1-5 seconds.
   */
  private getRandomDelay(): number {
    return Math.floor(Math.random() * 5000) + 1000; // 1000ms to 5000ms (1-5 seconds)
  }
}
