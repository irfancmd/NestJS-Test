import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

/*
  Interceptors bring on some functionality of aspect oriented programming like executing custom
  logic before and after a function, modifying a function's output etc.
*/
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // We are transforming return types by wrapping the response in data JSON property.
    return next.handle().pipe(map(data => ({ data })));
  }
}
