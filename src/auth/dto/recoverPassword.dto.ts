import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { EMAIL_EXAMPLE } from 'src/constants';

export class RecoverPasswordDto {
  @IsEmail()
  @ApiProperty({ example: EMAIL_EXAMPLE })
  email: string;
}
