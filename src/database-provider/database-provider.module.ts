// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from 'src/session/entities/session.entity';
import { UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');
        if (!mongoUri) throw new Error('Connection Error');
        return {
          uri: mongoUri,
        };
      },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Session', schema: SessionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
