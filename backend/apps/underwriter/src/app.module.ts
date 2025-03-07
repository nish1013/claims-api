import { Module } from '@nestjs/common';
import { ClaimsModule } from './claims/claims.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClaimsModule],
})
export class AppModule {}
