import { Module } from '@nestjs/common';
import { SenderEmailService } from './sender-email.service';

@Module({
  providers: [SenderEmailService],
  exports: [SenderEmailService],
})
export class SenderEmailModule {}
