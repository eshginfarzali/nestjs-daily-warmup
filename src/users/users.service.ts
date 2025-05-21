import { UpdateUserDto } from './dto/update-user.input';
import { CreateUserDto } from './dto/create-user.input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];
  getUsers() {
    return this.users;
  }
  getUser(index: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.users[index];
  }
  createUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return `${createUserDto.username} ${createUserDto.email} Create user successful!`;
  }
  updateUser(index: string, updateUserDto: UpdateUserDto) {
    this.users[index] = updateUserDto;
    return `${updateUserDto.username} ${updateUserDto.email} Update user successful!`;
  }
  deleteUser(index: number) {
    this.users.splice(index, 1);
    return 'Delete user successful!';
  }
}
