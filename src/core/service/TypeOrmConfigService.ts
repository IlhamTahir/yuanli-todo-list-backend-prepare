import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../../config/database';

@Injectable()
export class TypeOrmConfigService {
  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('ddl', this.dbConfig.dllEnable);
    return {
      type: 'mysql',
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      autoLoadEntities: true,
      synchronize: this.dbConfig.dllEnable,
    };
  }
}
