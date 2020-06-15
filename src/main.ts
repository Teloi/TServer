import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './core/middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { AllExceptionsFilter } from './core/filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 设置全局路由前缀
  // app.setGlobalPrefix('xxx');

  // 监听所有的请求路由，并打印日志
  app.use(logger);

  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor()); // 启用全局拦截器

  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 启动
  await app.listen(5859);
}
bootstrap();
