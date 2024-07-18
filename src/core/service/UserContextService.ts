import { User } from '../entity/User';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../../dist/src/core/dto/JwtPayload';

@Injectable()
export class UserContextService {
  private user: User;

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setUserByJwtPayload(payload: JwtPayload) {
    const user = new User();
    user.id = payload.sub;
    user.username = payload.username;
    this.setUser(user);
  }
}
