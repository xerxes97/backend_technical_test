import { Test, TestingModule } from '@nestjs/testing';
import { SenderEmailService } from './sender-email.service';

describe('SenderEmailService', () => {
  let service: SenderEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenderEmailService],
    }).compile();

    service = module.get<SenderEmailService>(SenderEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
