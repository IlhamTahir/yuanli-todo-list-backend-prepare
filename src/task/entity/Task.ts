import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enum/TaskStatus';
import { TraceableEntity } from '../../core/entity/TraceableEntity';
import { TaskList } from './TaskList';

@Entity()
export class Task extends TraceableEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks)
  @JoinColumn({ name: 'taskListId' })
  taskList: TaskList;
}
