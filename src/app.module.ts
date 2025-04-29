import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database-provider/database-provider.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SenderEmailService } from './sender-email/sender-email.service';
import { SenderEmailModule } from './sender-email/sender-email.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    SenderEmailModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, SenderEmailService],
})
export class AppModule {}
