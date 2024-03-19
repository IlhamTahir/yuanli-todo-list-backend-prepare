import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/UserService';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  get() {
    return this.userService.findAll();
  }
}
