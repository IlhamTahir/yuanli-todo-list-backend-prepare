import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserService } from './service/UserService';
import { User } from './entity/User';
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import { AuthService } from './service/AuthService';
import { TokenController } from './controller/TokenController';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { UserController } from './controller/UserController';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './constant/user';
import { AuthGuard } from './guard/AuthGuard';
import { HttpExceptionFilter } from './filter/HttpExceptionFilter';
import { CacheModule } from '@nestjs/cache-manager';
import { TestController } from './controller/TestController';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Global()
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://localhost:6379',
      ttl: 600 * 1000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: '240s' },
    }),
    TypeOrmModule.forFeature([User]),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: `logs/combined.log`,
          level: 'info',
        }),
      ],
    }),
  ],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [TokenController, UserController, TestController],
})
export default class CoreModule {
  constructor(private dataSource: DataSource) {}
}
