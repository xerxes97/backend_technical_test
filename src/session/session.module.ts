import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { DatabaseModule } from 'src/database-provider/database-provider.module';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [DatabaseModule],
  exports: [SessionService],
})
export class SessionModule {}
