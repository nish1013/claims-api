import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('mocked.jwt.token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when valid credentials are provided', async () => {
      const authDto: AuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockUser = {
        userId: 1,
        username: 'testuser',
        password: 'testpassword',
      };

      mockUsersService.findOne.mockResolvedValueOnce(mockUser);

      const result: TokenDto = await authService.signIn(authDto);

      expect(usersService.findOne).toHaveBeenCalledWith(authDto.username);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.userId,
        username: mockUser.username,
      });
      expect(result).toEqual({ access_token: 'mocked.jwt.token' });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const authDto: AuthDto = {
        username: 'testuser',
        password: 'wrongpassword',
      };
      const mockUser = {
        userId: 1,
        username: 'testuser',
        password: 'testpassword',
      };

      mockUsersService.findOne.mockResolvedValueOnce(mockUser);

      await expect(authService.signIn(authDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const authDto: AuthDto = {
        username: 'nonexistent',
        password: 'password',
      };

      mockUsersService.findOne.mockResolvedValueOnce(undefined);

      await expect(authService.signIn(authDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
