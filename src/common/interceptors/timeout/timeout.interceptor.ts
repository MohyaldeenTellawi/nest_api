import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //logic current request before methode execution
    //for example
    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest<Request>();
    // request.body = { ...request.body, username: "Test User" };
    return next.handle().pipe(
      timeout(3000),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return error;
      }),
    );
  }
}
