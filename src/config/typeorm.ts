import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';

require('dotenv').config();

export const cliConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  entities: ['src/**/entity/*'],
  migrations: ['migrations/*{.js,.ts}'],
  subscribers: ['subscribers/*{.js,.ts}'],
  logger: 'file',
  logging: true,
};

// 实例化dataSource，用以之后cli使用
const dataSource = new DataSource(cliConfig);

// 此处的dataSource需要 export default才可以使用
export default dataSource;
