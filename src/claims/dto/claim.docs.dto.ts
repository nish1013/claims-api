import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimDocsDto {
  @ApiProperty({
    example: ['path/to/file1', 'path/to/file2'],
    description: 'List of document URLs',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  urls: string[];
}
