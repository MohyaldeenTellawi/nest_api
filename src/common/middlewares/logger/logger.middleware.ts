import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
// we can make 'use methode' async if we want to call await params
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //apply any logic
    console.log('Logger Middleware');
    next();
  }
}
