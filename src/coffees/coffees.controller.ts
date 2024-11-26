import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('Custom Coffee Tag') // For Swagger. Optional. Default is the Controller's name.
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

  
  @ApiForbiddenResponse({ description: 'Forbidden.'}) // For Swagger. Optional.
  @Public() // Our own decorator that make this method work without authorization.
  @Get()
  // We can get access to query parameters using the @Query decorator.
  // We're also using our own custom Protocol decorator to get the request protocol as an example.
  // We could use the NestJS @Req() decorator to grab the request object to get the protocol from it.
  // However, that would make this method hard to test because we had to create a mock request object.
  // So sometimes, custom decorators can help creating more readable and testable code.
  // Note that our protocol takes a default value as parameter.
  async findAll(@Query() paginationQueryDto: PaginationQueryDto, @Protocol('https') protocol: string) {
    // Code for testing our timeout interceptor
    // await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('Protocol:', protocol);

    return this.coffeeservice.findAll(paginationQueryDto);
  }

  // If we use @Params without argument, it will capture all URL parameters
  // @Get(':id')
  // findOne(@Param() params) {
  //   return `This action returns #${params.id} coffee.`;
  // }

  // We can capture specific URL parameter by passing the parameter name in the @Param decorator
  // We're also passing a parameter-level pipe in @Param.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
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
  // We cold use a parameter level building block (only works for ValidationPipe)
  // for the body like this: @Body(ValidationPipe).
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
