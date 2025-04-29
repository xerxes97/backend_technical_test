import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email']),
) {
  @IsString()
  @IsOptional()
  token: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, required: false })
  isActive?: boolean;
}
