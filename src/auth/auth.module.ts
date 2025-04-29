import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SenderEmailModule } from 'src/sender-email/sender-email.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    SenderEmailModule,
    JwtModule,
    SessionModule,
  ],
})
export class AuthModule {}
