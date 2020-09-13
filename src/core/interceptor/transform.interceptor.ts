import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TResult } from '../http/http.base';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map(data => {
        // 统一添加请求成功外壳
        const result = new TResult<any>();
        result.success = true;
        result.result = data;
        return result;
      }),
      map(data => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}
