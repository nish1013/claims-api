import { Module } from '@nestjs/common';
import { ClaimsModule } from './claims/claims.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLER_TTL) || 60000,
        limit: Number(process.env.THROTTLER_LIMIT) || 10,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    ClaimsModule],
})
export class AppModule {}
