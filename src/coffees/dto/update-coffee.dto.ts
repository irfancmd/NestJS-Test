// import { PartialType } from '@nestjs/mapped-types';
// For Swagger to be able to map partial types, we have to import
// "PartialType" from the swagger package instead of the "mapped-types" package.

import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
