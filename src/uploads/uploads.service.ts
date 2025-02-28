import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadsService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'claims-documents', resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject('Failed to upload file');
            }

            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  }
}
