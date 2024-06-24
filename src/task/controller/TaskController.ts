import { Controller, Get, Param } from '@nestjs/common';

@Controller('/task')
export class TaskController {
  @Get('/:id')
  get(@Param('id') id: string) {
    return id;
  }
}
