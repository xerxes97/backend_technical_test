import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<void> {
    try {
      const session = await this.sessionModel.findOne({
        userId: createSessionDto.userId,
      });
      if (session) {
        session.refreshToken = createSessionDto.refreshToken;
        await session.save();
      }
      await this.sessionModel.create(createSessionDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }
}
