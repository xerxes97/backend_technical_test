import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import {
  DATE_EXAMPLE,
  EMAIL_EXAMPLE,
  ID_EXAMPLE,
  NAME_EXAMPLE,
} from 'src/constants';

export class UserDto {
  @IsString()
  @ApiProperty({ example: ID_EXAMPLE })
  _id: string;

  @IsString()
  @ApiProperty({ example: NAME_EXAMPLE })
  name: string;

  @IsEmail()
  @ApiProperty({ example: EMAIL_EXAMPLE })
  email: string;

  @IsString()
  @ApiProperty({ example: DATE_EXAMPLE })
  createdAt: Date;

  @IsString()
  @ApiProperty({ example: true })
  isActive: boolean;
}
