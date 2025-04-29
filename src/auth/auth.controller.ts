import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recoverPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  recover(@Body() recoverPasswordDto: RecoverPasswordDto) {
    return this.authService.recoverPassword(recoverPasswordDto);
  }
}
