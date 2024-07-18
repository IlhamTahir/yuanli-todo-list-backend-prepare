import { Injectable } from '@nestjs/common';
import { TaskListCreateRequest } from '../dto/TaskListCreateRequest';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from '../entity/TaskList';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  createTaskList(taskListCreateRequest: TaskListCreateRequest) {
    const taskList = new TaskList();
    taskList.name = taskListCreateRequest.name;
    return this.taskListRepository.save(taskList);
  }
}
