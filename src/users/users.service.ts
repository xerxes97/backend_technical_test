import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SEED_USERS } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const { password, ...data } = createUserDto;
      const userExist = await this.findByEmail(data.email);
      if (userExist) {
        throw new BadRequestException('User already exist');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        ...data,
        password: hashedPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user.toObject();
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email }, { password: 0 });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find({ password: 0 });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id, {
        password: 0,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      await this.userModel.updateOne({ _id: id }, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async seed(): Promise<void> {
    try {
      const count = await this.userModel.countDocuments();
      if (count >= 2) {
        console.log('We have users');
        return;
      }
      await this.userModel.deleteMany();
      const users = await Promise.all(
        SEED_USERS.map(async (user) => {
          return {
            ...user,
            password: await bcrypt.hash(user.password, 10),
          };
        }),
      );
      await this.userModel.insertMany(users);
      console.log('Seeder executed');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
