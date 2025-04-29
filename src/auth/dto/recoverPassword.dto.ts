import { IsEmail } from 'class-validator';

export class RecoverPasswordDto {
  @IsEmail()
  to: string;
}
