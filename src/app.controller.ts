import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';

// This is how we can setup a controller level building block.
// NestJS provides other building blocks like useFilters, useGuards and useInterceptors.
// These methods can take comma seperate list of multiple building blocks.
// We can also pass specific instances in them like '@UsePipes(new ValidationPipe())'.
@UsePipes(ValidationPipe)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This is how we can setup a method level building block.
  // Rest of the info about method level is same as the controlle level building blocks
  // that are given above.
  // @UsePipes(ValidationPipe)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Another type of building block level is parameter level, which ONLY WORKS fo Pipes. 
}
