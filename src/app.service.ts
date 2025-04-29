import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  powerOn(): string {
    return "We're online 💪💪💪";
  }
}
