import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../../config/database';

@Controller('/task')
export class TaskController {
  @Inject(databaseConfig.KEY)
  private dbConfig: ConfigType<typeof databaseConfig>;
  @Get()
  getTasks() {
    return this.dbConfig;
  }
}
