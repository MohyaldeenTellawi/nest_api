import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUPLIC_KEY } from 'src/common/decoretors/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = 'e';

    // handle access status
    const isPuplic = this.reflector.get<boolean>(
      IS_PUPLIC_KEY,
      context.getHandler(),
    );

    if (isPuplic) {
      return true;
    }
    // verfy token if verfird return true else return false
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const token = req.header('Authorization')
      ? req.header('Authorization').split('')[1]
      : '';
    if (token !== jwt) {
      throw new UnauthorizedException('Invalid Token..');
    }
    return true;
  }
}
