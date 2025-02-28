import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UploadsController],
  providers: [UploadsService, CloudinaryProvider],
  exports: [UploadsService],
})
export class UploadsModule {}
