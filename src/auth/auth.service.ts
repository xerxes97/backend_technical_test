import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const existingUser = await this.userService.findByEmail(email);
      if (!existingUser) {
        throw new BadRequestException('Wrong credentials');
      }
      const match = await bcrypt.compare(password, existingUser.password);
      if (!match) {
        throw new BadRequestException('Wrong credentials');
      }
      const payload = { email: existingUser.email, id: existingUser._id };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
