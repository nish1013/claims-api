import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from '../claims/schemas/claims.schema';
import { ClaimsService } from '../claims/claims.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
  ],
  controllers: [UploadsController],
  providers: [UploadsService, CloudinaryProvider, ClaimsService],
  exports: [UploadsService],
})
export class UploadsModule {}
