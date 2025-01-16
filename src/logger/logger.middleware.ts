import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    const originalSend = res.send;

    res.send = function (body, ...args) {
      res.locals.body = body;
      return originalSend.apply(res, [body, ...args]);
    };

    res.on('finish', () => {
      const { statusCode } = res;
      const delay = Date.now() - start;
      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${delay}ms`);
      // this.logger.log(`Request headers: ${JSON.stringify(req.headers)}`);
      // this.logger.log(`Request body: ${JSON.stringify(req.body)}`);
      // this.logger.log(`Response headers: ${JSON.stringify(res.getHeaders())}`);
      // this.logger.log(`Response body: ${JSON.stringify(res.locals.body)}`);
    });

    next();
  }
}
