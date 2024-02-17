import { Module } from '@nestjs/common';
import TaskModule from './task/TaskModule';
import CoreModule from './core/CoreModule';

@Module({
  imports: [CoreModule, TaskModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
