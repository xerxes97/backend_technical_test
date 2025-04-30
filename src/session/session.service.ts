import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './entities/session.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSessionDto } from './dto/update-session.dto';

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

  async findByRefreshToken(refreshToken: string): Promise<Session | null> {
    try {
      return await this.sessionModel.findOne({ refreshToken });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<void> {
    try {
      await this.sessionModel.updateOne({ _id: id }, updateSessionDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removeAll(): Promise<void> {
    try {
      console.log('Removing sessions...');
      await this.sessionModel.deleteMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
