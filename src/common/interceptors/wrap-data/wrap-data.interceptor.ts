import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //logic: intercept to request
    //include pipe we write logic to handle response

    return next.handle().pipe(
      map((data) => {
        return { response: data };
      }),
    );
  }
}
