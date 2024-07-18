import { Module } from '@nestjs/common';
import { TaskListController } from './controller/TaskListController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/Task';
import { TaskList } from './entity/TaskList';
import { TaskService } from './service/TaskService';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  providers: [TaskService],
  controllers: [TaskListController],
})
export default class TaskModule {}
