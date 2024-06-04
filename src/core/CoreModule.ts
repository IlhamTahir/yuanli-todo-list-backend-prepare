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
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { UserController } from './controller/UserController';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './constant/user';
import { AuthGuard } from './guard/AuthGuard';

@Global()
@Module({
  imports: [
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
  ],
  controllers: [TokenController, UserController],
})
export default class CoreModule {
  constructor(private dataSource: DataSource) {}
}
