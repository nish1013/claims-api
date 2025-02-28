import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'AUTH_USERNAME') return 'testuser';
        if (key === 'AUTH_PASSWORD') return 'testpassword';
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize users array from ConfigService', async () => {
    expect(service['users']).toHaveLength(1);
    expect(service['users'][0]).toEqual({
      userId: 1,
      username: 'testuser',
      password: 'testpassword',
    });
  });

  it('should return a user when `findOne` is called with a valid username', async () => {
    const user = await service.findOne('testuser');
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser');
  });

  it('should return undefined when `findOne` is called with an invalid username', async () => {
    const user = await service.findOne('nonexistent');
    expect(user).toBeUndefined();
  });
});
