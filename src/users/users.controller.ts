import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.input';

@Controller('users')
export class UsersController {
  //injectable decorative
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  @Get(':index')
  findOne(@Param('index') index: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.usersService.getUser(index);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':index')
  update(@Param('index') index: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(index, updateUserDto);
  }

  @Delete(':index')
  delete(@Param('index') index: number) {
    return this.usersService.deleteUser(index);
  }
}
