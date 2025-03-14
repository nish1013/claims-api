import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ExternalService } from '../interfaces/external-service';
import { ExternalAuthService } from '../external-auth/external-auth.service';

@Injectable()
export class UnderwriterExternalService {
  private readonly logger = new Logger(UnderwriterExternalService.name);
  private readonly underwriterUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly externalAuth: ExternalAuthService,
  ) {
    this.underwriterUrl = this.configService.get<string>('UNDERWRITER_URL', '');
  }

  /**
   * Submits a claim to the underwriter.
   */
  async submitClaim(claimId: string, policyNumber: string) {
    if (!this.underwriterUrl) {
      this.logger.error('Underwriter URL is not configured.');
      return;
    }

    const payload = { claimId, policyNumber };
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = this.externalAuth.generateSignature(
      payload,
      timestamp,
      ExternalService.Underwriter,
    );

    try {
      const response = await axios.post(
        `${this.underwriterUrl}/claims/evaluate`,
        payload,
        {
          headers: {
            'X-Timestamp': timestamp,
            'X-Signature': signature,
          },
        },
      );
      this.logger.log(
        `Claim ${claimId} sent to underwriter: ${response.status}`,
      );
    } catch (error) {
      this.logger.error(`Failed to submit claim ${claimId}: ${error.message}`);
    }
  }
}
