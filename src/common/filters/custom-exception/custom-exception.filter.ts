import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // by useing host i can access to context of Http
    // const ctx = host.switchToWs(); here i can access to context of Websocket
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    // translate logic use cases
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);
    // use sentry to send error here
    // for example sentry.log(error)
    response.status(statusCode).json({
      ...error,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
