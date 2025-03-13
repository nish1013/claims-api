import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { ExternalService } from '../interfaces/external-service';

@Injectable()
export class ExternalAuthService {
  private readonly logger = new Logger(ExternalAuthService.name);
  private readonly serviceSecrets: Record<string, string>;

  constructor(private readonly configService: ConfigService) {
    const secretsConfig = this.configService.get<string>('HMAC_SECRETS', '{}');
    this.serviceSecrets = JSON.parse(secretsConfig);
  }

  /**
   * Generates an HMAC signature for the given external service.
   */
  generateSignature(
    payload: any,
    timestamp: string,
    service: ExternalService,
  ): string | null {
    const secret = this.serviceSecrets[service];
    if (!secret) {
      this.logger.warn(`No HMAC secret found for service: ${service}`);

      return null;
    }

    const message = `${timestamp}:${JSON.stringify(payload)}`;

    return crypto.createHmac('sha256', secret).update(message).digest('hex');
  }

  /**
   * Verifies an incoming HMAC signature.
   */
  verifySignature(
    payload: any,
    timestamp: string,
    receivedSignature: string,
    service: ExternalService,
  ): boolean {
    const secret = this.serviceSecrets[service];
    if (!secret) {
      this.logger.warn(`No secret found for service: ${service}`);
      return false;
    }

    const expectedSignature = this.generateSignature(
      payload,
      timestamp,
      service,
    );

    return expectedSignature === receivedSignature;
  }
}
