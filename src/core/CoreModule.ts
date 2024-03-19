import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "../config/database";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      load: [databaseConfig],
    }),
  ],
  controllers: [],
})
export default class CoreModule {}
