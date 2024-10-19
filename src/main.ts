import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // This is needed for using validation pipe
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
  ); 

  // NestJs provies a good enough built in exception filter. But we can make our own if needed.
  app.useGlobalFilters(new HttpExceptionFilter());

  // Sample guard
  // Commented since we're now injecting this guard through the CommonModule.
  // app.useGlobalGuards(new ApiKeyGuard());

  // Sample interceptor
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor());

  await app.listen(3000);
}
bootstrap();
