import { Controller, Get } from '@nestjs/common';
//controller is crud
//localhost:3000/users
// @Controller('users')
// export class UsersController {
//   @Get()
//   getUsers() {
//     return 'Hello World!';
//   }
//localhost:3000/users/getusers
@Controller('users')
export class UsersController {
  @Get('getusers')
  getUsers() {
    return 'Hello World!';
  }
}
