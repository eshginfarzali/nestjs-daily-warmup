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
  create(@Body() username: string) {
    return this.usersService.createUser(username);
  }

  @Put(':index')
  update(@Param('index') index: string, @Body() username: string) {
    return this.usersService.updateUser(index, username);
  }

  @Delete(':index')
  delete(@Param('index') index: number) {
    return this.usersService.deleteUser(index);
  }
}
