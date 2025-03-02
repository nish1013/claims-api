import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Body,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { ClaimsService } from '../claims/claims.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller({
  path: 'uploads',
  version: '1',
})
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly claimsService: ClaimsService, // Inject ClaimsService
  ) {}

  @Post('documents/:claimId')
  @ApiOperation({ summary: 'Upload multiple files for a claim' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadFiles(
    @Param('claimId') claimId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.');
    }

    // Upload files
    const uploadedUrls = await Promise.all(
      files.map((file) => this.uploadsService.uploadFile(file)),
    );

    // Update claim with document URLs
    const updatedClaim = await this.claimsService.updateClaimDocuments(
      claimId,
      uploadedUrls,
    );

    if (!updatedClaim) {
      throw new BadRequestException(`Claim with ID ${claimId} not found.`);
    }

    return { documentUrls: uploadedUrls };
  }
}
