// traceable-entity-subscriber.ts
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { TraceableEntity } from '../entity/TraceableEntity';
import { UserContextService } from '../service/UserContextService';

@EventSubscriber()
export class TraceableEntitySubscriber
  implements EntitySubscriberInterface<TraceableEntity>
{
  constructor(private readonly userContextService: UserContextService) {}

  listenTo() {
    return TraceableEntity;
  }

  beforeInsert(event: InsertEvent<TraceableEntity>) {
    const user = this.userContextService.getUser();
    if (user) {
      event.entity.createBy = user;
    }
  }

  beforeUpdate(event: UpdateEvent<TraceableEntity>) {
    const user = this.userContextService.getUser();
    if (user) {
      event.entity.updateBy = user;
    }
  }
}
