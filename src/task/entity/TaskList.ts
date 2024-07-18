import { Column, Entity, OneToMany } from 'typeorm';
import { TraceableEntity } from '../../core/entity/TraceableEntity';
import { TaskListStatus } from '../enum/TaskListStatus';
import { Task } from './Task';

@Entity()
export class TaskList extends TraceableEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskListStatus,
    default: TaskListStatus.ACTIVE,
  })
  status: TaskListStatus;

  // 一对多关系：一个 TaskList 包含多个 Task
  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
