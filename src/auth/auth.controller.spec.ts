import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when valid credentials are provided', async () => {
      const authDto: AuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      const expectedToken: TokenDto = { access_token: 'mocked.jwt.token' };

      mockAuthService.signIn.mockResolvedValueOnce(expectedToken);

      const result = await controller.signIn(authDto);

      expect(authService.signIn).toHaveBeenCalledWith(authDto);
      expect(result).toEqual(expectedToken);
    });
  });
});
