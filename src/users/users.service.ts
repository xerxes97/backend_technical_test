import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...data } = createUserDto;
      const userExist = await this.findByEmail(data.email);
      if (userExist) {
        throw new BadRequestException('User already exist');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.userModel.create({ ...data, password: hashedPassword });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      await this.userModel.updateOne({ _id: id }, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
