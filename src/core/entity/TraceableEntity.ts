import { BaseEntity } from './BaseEntity';
import { Entity, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export abstract class TraceableEntity extends BaseEntity {
  @ManyToOne(() => User)
  createBy: User;

  @ManyToOne(() => User)
  updateBy: User;
}
