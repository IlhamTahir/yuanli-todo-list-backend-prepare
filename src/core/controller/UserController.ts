import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserCreateRequest } from '../dto/UserCreateRequest';
import { UserService } from '../service/UserService';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userCreateRequest: UserCreateRequest) {
    return this.userService.create(userCreateRequest);
  }

  @Get('/current')
  current(@Request() req) {
    console.log(req.user);
    return this.userService.findByUsername(req.user.username);
  }
}
