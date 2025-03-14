import { Module } from '@nestjs/common';
import { ExternalAuthService } from './external-auth.service';

@Module({
  providers: [ExternalAuthService],
  exports: [ExternalAuthService],
})
export class ExternalAuthModule {}
