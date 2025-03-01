import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimsModule } from './claims/claims.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule, AuthModule, UploadsModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    ClaimsModule,
    UsersModule,
  ],
})
export class AppModule {}
