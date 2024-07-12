import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

@Module({})
export class DemoDynamicModuleModule {
  // If our module needs providers that can change depend on application logic, we might
  // need dynamic modules. Here, rather than declaring providers in the decorator, we have
  // to declare them in the "register" static method.

  // Note, we're settimg up a databse connection JUST FOR DEMONSTRATION. This has nothing to
  // do with the application's main databse.
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DemoDynamicModuleModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}

// Check out the coffee-rating module to see how this dynamic module is imported.
