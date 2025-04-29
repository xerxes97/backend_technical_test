import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EMAIL_EXAMPLE, PASSWORD_EXAMPLE } from 'src/constants';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: EMAIL_EXAMPLE })
  email: string;

  @IsString()
  @ApiProperty({ example: PASSWORD_EXAMPLE })
  password: string;
}
