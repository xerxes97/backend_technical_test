import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SenderEmailService } from 'src/sender-email/sender-email.service';
import { RecoverPasswordDto } from './dto/recoverPassword.dto';
import { mailTemplates } from 'src/sender-email/templates';
import { RECOVER_PASSWORD_SUBJECT } from 'src/constants';

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
        throw new BadRequestException('Wrong Credentials');
      }
      const match = await bcrypt.compare(password, existingUser.password);
      if (!match) {
        throw new BadRequestException('Wrong Credentials');
      }
      if (!existingUser.isActive) {
        throw new BadRequestException('User Inactive');
      }
      const payload = { email: existingUser.email, id: existingUser._id };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    const { email } = recoverPasswordDto;
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const token = this.jwtService.sign({ id: user._id, email: user.email });
      const template = mailTemplates.RECOVER_PASSWORD(user._id, token);
      await this.senderEmailService.sendEmail({
        to: email,
        subject: RECOVER_PASSWORD_SUBJECT,
        html: template,
      });
      await this.userService.update(user._id, { token });
      return 'Email sent successfully';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
