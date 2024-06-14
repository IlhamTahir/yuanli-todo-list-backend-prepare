import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenCreateRequest } from '../dto/TokenCreateRequest';
import { UserService } from './UserService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';

// later
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cacheManager: Cache,
  ) {}
  async createToken(tokenCreateRequest: TokenCreateRequest) {
    const user = await this.userService.findByUsername(
      tokenCreateRequest.username,
    );
    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(
      tokenCreateRequest.password,
      user.encryptedPassword,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return this.jwtService.signAsync(payload);
  }

  getCache() {
    return this.cacheManager;
  }
}
