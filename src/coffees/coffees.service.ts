import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'valilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((c) => c.id === +id);
  }

  create(createCoffeeDto: any) {
    this.coffees.push({ ...createCoffeeDto, id: this.coffees.length + 1 });
  }

  update(id: string, updateCoffeeDto: any) {
    const coffeeIndex = this.coffees.findIndex((c) => c.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees[coffeeIndex] = {
        id: +id,
        name: updateCoffeeDto.name,
        brand: updateCoffeeDto.brand,
        flavors: updateCoffeeDto.flavors,
      };
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((c) => c.id === +id);

    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
