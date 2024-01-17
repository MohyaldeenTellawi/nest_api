import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';

import ormConfig from './config/orm.config';

import ormConfigProd from './config/orm.config.prod';

@Module({
  // ConfigModule.forRoot() allow to access .env file data includes
  //without this module can not access any variables in .env file
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvVars: true, this row to ignor all env files
      isGlobal: true, //this row allow to use configModule as Global
      load: [ormConfig, ormConfigProd],
      expandVariables: true, // example in env file
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: ormConfig,
    // }),
    UsersModule,
    CommonModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
      )
      .forRoutes(UsersController);
  }
}
