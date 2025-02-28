import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  // TODO: replace this with real database query
  // https://github.com/nish1013/claims-api/issues/4
  private readonly users: User[];

  constructor(private readonly configService: ConfigService) {
    const password = this.configService.get<string>('AUTH_PASSWORD');
    const username = this.configService.get<string>('AUTH_USERNAME');
    this.users = [
      {
        userId: 1,
        username,
        password,
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
