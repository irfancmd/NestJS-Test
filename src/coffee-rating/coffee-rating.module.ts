import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DemoDynamicModuleModule } from 'src/demo-dynamic-module/demo-dynamic-module.module';

@Module({
  imports: [
    CoffeesModule,
    // This is how we import a dynamic module
    DemoDynamicModuleModule.register({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'pass123',
      port: 5432,
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
