import { Injectable } from '@nestjs/common';
import { UserContextService } from './UserContextService';

@Injectable()
export class BaseService {
  constructor(protected readonly userContextService: UserContextService) {}

  getCurrentUser() {
    return this.userContextService.getUser();
  }
}
