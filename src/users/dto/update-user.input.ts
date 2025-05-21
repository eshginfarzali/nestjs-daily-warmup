import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
/* eslint-disable */ 
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
