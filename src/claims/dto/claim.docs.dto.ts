import { ApiProperty } from '@nestjs/swagger';

export class ClaimDocsDto {
  @ApiProperty({
    example: ['path/to/file1', 'path/to/file2'],
    description: 'List of documents',
  })
  urls: string[];
}
