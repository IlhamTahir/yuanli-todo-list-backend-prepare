import { Module } from '@nestjs/common';
import { TaskController } from './controller/TaskController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/Task';
import { TaskList } from './entity/TaskList';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  providers: [],
  controllers: [TaskController],
})
export default class TaskModule {}
