import { Global, Module } from '@nestjs/common';
import CoreController from './controller/CoreController';

@Global()
@Module({
  controllers: [CoreController],
})
export default class CoreModule {}
