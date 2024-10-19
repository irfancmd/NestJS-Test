import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './task/data.source';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DemoDynamicModuleModule } from './demo-dynamic-module/demo-dynamic-module.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // ConfigModule looks for .env at root by default. So we would pass no parameter in our
    // case and it would still work.
    ConfigModule.forRoot({
      // If our .env file is in a different path or has a differnt name, we can refer to it like this:
      // envFilePath: '.environment1',

      // We can ignore env files if we want like this;
      // ignoreEnvFile: true

      // If we want to load configuration from an configuration object, we can do it like this.
      // The configuration object is located at src/config/app.config.ts
      // load: [appConfig]

      // Optional validation schema for environment valiables
      validationSchema: Joi.object({
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    // Using async forRoot here to make sure that it's dependencies are resolved before NestJS
    // initializes it. It's important if we don't want import orders to have any effect on our
    // application's behaviour.
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DemoDynamicModuleModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // This is how we can setup a module level building block.
    // NestJS provides other building blocks like APP_FILTER, APP_GUARD and APP_INTERCEPTOR
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // }
  ],
})
export class AppModule {}
