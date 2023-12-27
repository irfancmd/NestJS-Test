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
      // This will try to automatically convert request url parameter to the type that
      // an action method expects.
      // transform: true,
    }),
  ); // This is needed for using validation pipe
  await app.listen(3000);
}
bootstrap();
