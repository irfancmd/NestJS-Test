import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService } from '@nestjs/config';

// Providers can have thee scopes. Singleton (default), transient (new instance for every call)
// and request (new instance for every request/response cycle). If we pass no argument to the
// Injectable decorator, the default scope (singleton) will be used. Note that everything that depends
// on this provider, will be impicitly scoped to this provider's scope as well. This means the
// CoffeeController will be request scoped if the CoffeeService is request scoped.

@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {
  // The repository will be automatically created by TypeORM using entity the class.
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    // This is how we can inject a non-class provider. We must pass the "Provider Token"
    // to the "Inject" decorator.
    @Inject(COFFEE_BRANDS) readonly coffeeBrands: string[],
    private readonly configService: ConfigService,
  ) {
    console.log(coffeeBrands);

    // We can access environment variables from the config service WITH type safety.
    // The second argument is the default/fallback value.
    const database_host = this.configService.get<string>(
      'DATABASE_HOST',
      'localhost',
    );
    console.log(database_host);
  }

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    // We're using EAGER LOADING for "flavors".
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: ['flavors'],
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found.`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    // The "preload" method looks for an entity using the primary key in the
    // database. If it finds it, it updates that entity with the supplied properties
    // and returns it. If it cannot find an entity, it returns null.
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found.`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return this.coffeeRepository.remove(coffee);
  }

  // This will run a transaction
  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release;
    }
  }

  private async preloadFlavorByName(flavorName: string) {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {
        name: flavorName,
      },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name: flavorName });
  }
}
