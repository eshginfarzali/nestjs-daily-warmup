import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
/* eslint-disable */ 
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
