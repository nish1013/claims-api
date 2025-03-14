import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { Claim, ClaimSchema } from './schemas/claims.schema';
import { UnderwriterExternalService } from 'src/underwriter/underwriter-external.service';
import { ExternalAuthService } from 'src/security/external-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService, UnderwriterExternalService, ExternalAuthService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
