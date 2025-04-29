import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { EMAIL_EXAMPLE, NAME_EXAMPLE, PASSWORD_EXAMPLE } from 'src/constants';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: NAME_EXAMPLE })
  name: string;

  @IsEmail()
  @ApiProperty({ example: EMAIL_EXAMPLE })
  email: string;

  @IsString()
  @ApiProperty({ example: PASSWORD_EXAMPLE })
  password: string;
}
