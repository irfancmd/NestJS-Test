import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // This will make sure that properties that are not in the DTOs GETS ignored.
      whitelist: true,
      // Setting this true will throw an error if any non-whitelisted property
      // (property not in DTOs) gets detected.
      forbidNonWhitelisted: true,
      // This is optional because typescript only matches the "Shape" of objects. But if
      // we want the body to be transformed into and instance of a DTO, set this property
      // to true. This will try to do necessary transformations and make the body and instance
      // of the DTO class. It will also automatically convert url parameter to the type that
      // the action method expects.
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  ); // This is needed for using validation pipe
  await app.listen(3000);
}
bootstrap();
