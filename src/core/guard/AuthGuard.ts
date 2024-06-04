import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SECRET_KEY, TOKEN_PREFIX } from '../constant/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 白名单
    if (['/tokens'].includes(request.url)) {
      return true;
    }
    const token = this.extractTokenFromHeader(request);
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: SECRET_KEY,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === TOKEN_PREFIX ? token : '';
  }
}
