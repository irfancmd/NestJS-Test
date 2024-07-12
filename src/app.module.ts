import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './task/data.source';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DemoDynamicModuleModule } from './demo-dynamic-module/demo-dynamic-module.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    // ConfigModule looks for .env at root by default. So we would pass no parameter in our
    // case and it would still work.
    ConfigModule.forRoot({
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
