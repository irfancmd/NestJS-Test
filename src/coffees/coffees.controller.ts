import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private coffeeservice: CoffeesService) {}

  // This is a simple action that handles the HTTP GET method
  // @Get()
  // findAll() {
  //   return 'This action returnes all coffees.';
  // }

  // We can get access to the framework's (express in our case, which is default) internal
  // request and response object like this. It's recommended to use Nest's standard approach
  // rather than framework dependent things whenever possible.
  // @Get()
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees.');
  // }

  // We can get access to query parameters like this
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.coffeeservice.findAll(paginationQueryDto);
  }

  // If we use @Params without argument, it will capture all URL parameters
  // @Get(':id')
  // findOne(@Param() params) {
  //   return `This action returns #${params.id} coffee.`;
  // }

  // We can capture specific URL parameter by passing the parameter name in the @Param decorator
  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffee = this.coffeeservice.findOne(id);

    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);

      // Or, we can use the simplified NotFoundException
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // We can send custom status code like this.
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeeservice.create(createCoffeeDto);

    return createCoffeeDto;
  }

  // We can also capture specific property of the body like this. Other properties won't be\
  // validated in this case.
  // @Post()
  // create(@Body('name') name: string) {
  //   return name;
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeeservice.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeeservice.remove(id);
  }
}
