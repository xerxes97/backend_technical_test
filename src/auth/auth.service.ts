import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SenderEmailService } from 'src/sender-email/sender-email.service';
import { RecoverPasswordDto } from './dto/recoverPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly senderEmailService: SenderEmailService,
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

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    const { to } = recoverPasswordDto;
    try {
      await this.senderEmailService.sendEmail({
        to,
        subject: 'Recover password',
        template: 'RECOVER_PASSWORD',
      });
      return 'Email sent successfully';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
