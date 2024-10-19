import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// For Demo
class MockCoffeeService {}
// For Demo
class SampleCoffeeService {}

// For Demo
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    // Since we already used forRoot in the AppModule, we can inject ConfigModule directly here

    // Full Config Module Registration
    // ConfigModule,

    // Partial Config Module Registration
    ConfigModule.forFeature(coffeesConfig)
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // Provides don't necessarily have to be classes
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
    // We can write custom initialization code using useFactory. Use factory is useful when we have to
    // inject async providers and we need the dependent classes of the provider to wait before it is initialized.
    // In that case, we have to use an async funtion in "useFactory".
    // {
    //   provide: COFFEE_BRANDS,
    //   inject: [CoffeeBrandsFactory], // providers defined in "inject" will be passed to the "useFactory" function
    //   useFactory: (coffeeBrandsFactory: CoffeeBrandsFactory) =>
    //     coffeeBrandsFactory.create(),
    // },

    // We can inject providers whose initialiation is asynchronous using the useFactory method as well.
    // In such cases, NestJs will automatically resolve those promises while injecting the dependency.
    // {
    //   provide: COFFEE_BRANDS,
    //   inject: [Connection],
    //   useFactory: async (connection: Connection) : Promise<string[]> =>
    //   // const coffeeBrands = await connection.query('SELECT * FROM ...');
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //     return coffeeBrands;
    // },

  ],
  // We can customize which instance should be passed to the dependency injector using
  // the "longhand" syntax like this.
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeeService()}]
  // We can use "useClass" if a provider token can point to multiple classes based on condition
  // In this case, we're just pointing the clas and NOT providing and isntance.
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useClass:
  //       process.env.NODE_ENV === 'development'
  //         ? SampleCoffeeService
  //         : MockCoffeeService,
  //   },
  // ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
