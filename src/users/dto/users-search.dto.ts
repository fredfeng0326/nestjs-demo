import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersSearchDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastName?: string;
}
