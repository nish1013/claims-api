import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { Public } from '../api.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: AuthDto, description: 'User credentials' })
  @ApiResponse({ status: 200, type: TokenDto, description: 'Access token' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() authDto: AuthDto): Promise<TokenDto> {
    return this.authService.signIn(authDto);
  }
}
