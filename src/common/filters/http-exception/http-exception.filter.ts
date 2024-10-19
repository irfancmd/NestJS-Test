import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { timestamp } from 'rxjs';

// We want to catch all instances of HttpException
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // The http context will give us express's native requet and response object
    const context = host.switchToHttp();

    // We will extract the response
    const response = context.getResponse<Response>(); // This is the express Response interface

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof response === 'string' ? { message : exceptionResponse } : (exceptionResponse as object)

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString() // additional data with the exception
    })
  }
}
