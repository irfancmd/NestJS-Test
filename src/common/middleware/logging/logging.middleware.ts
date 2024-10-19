import { Injectable, NestMiddleware } from '@nestjs/common';

/* Middlewares are bound to ROUTES, not methods.
 * Middlewares are called BEFORE any building blocks. They can listen to
 * request before it hits any action method, modify the request and pass it
 * to the next middleware. Lastly, it can change the response as well.
 * 
 * NestJS supports class type and function type middlewares. Class type
 * middlewares can leverage dependency injection which function middlewares
 * can't do. Here, we have a demonstration of a class type middleware.
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');

    console.log('Hi from middleware!');

    res.on('finish', () => console.timeEnd('Request-response time'));

    next();
  }
}
