import { Module } from '@nestjs/common';
import { TaskController } from './controller/TaskController';

@Module({
  imports: [],
  providers: [],
  controllers: [TaskController],
})
export default class TaskModule {}
