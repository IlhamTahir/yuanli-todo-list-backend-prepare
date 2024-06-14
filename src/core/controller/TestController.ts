import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../service/AuthService';

@Controller('/test')
export class TestController {
  constructor(private authService: AuthService) {}

  @Get()
  cacheTest() {
    return this.authService.getCache().set('test', '测试缓存');
  }
}
