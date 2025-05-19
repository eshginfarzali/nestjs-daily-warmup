import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: string[] = [];
  getUsers() {
    return this.users;
  }
  getUser(index: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.users[index];
  }
  createUser(username: string) {
    this.users.push(username);
    return 'Create user successful!';
  }
  updateUser(index: string, username: string) {
    this.users[index] = username;
    return 'Update user successful!';
  }
  deleteUser(index: number) {
    this.users.slice(index, 1);
    return 'Delete user successful!';
  }
}
