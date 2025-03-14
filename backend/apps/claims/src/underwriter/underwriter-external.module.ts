import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UnderwriterExternalService } from './underwriter-external.service';
import { ExternalAuthModule } from '../external-auth/external-auth.module';

@Module({
  imports: [ConfigModule, ExternalAuthModule],
  providers: [UnderwriterExternalService],
  exports: [UnderwriterExternalService],
})
export class UnderwriterExternalModule {}
