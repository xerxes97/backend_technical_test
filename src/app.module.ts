import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database-provider/database-provider.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SenderEmailService } from './sender-email/sender-email.service';
import { SenderEmailModule } from './sender-email/sender-email.module';
import { SessionModule } from './session/session.module';
import { UsersService } from './users/users.service';
import { SessionService } from './session/session.service';

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
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly sessionService: SessionService,
  ) {}
  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isSeederEnabled = this.configService.get('RUN_SEEDER');
    if (isSeederEnabled === 'true') {
      console.log('Running Seeder...');
      await this.sessionService.removeAll();
      await this.userService.seed();
    }
  }
}
