import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'user', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  password: string;
}
