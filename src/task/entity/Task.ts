import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entity/BaseEntity';
import { TaskStatus } from '../enum/TaskStatus';

@Entity()
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;
}
