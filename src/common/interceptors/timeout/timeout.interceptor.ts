import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // We will terminate a request if we can't provide a response within 3 seconds.
    // The timeout() operator of RxJS allows us to implement it quite simply like this.
    return next.handle().pipe(timeout(3000), catchError(err => {
      if(err instanceof TimeoutError) {
        return throwError(new RequestTimeoutException());
      }

      return throwError(err);
    }));
  }
}
