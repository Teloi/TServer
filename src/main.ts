import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // app.setGlobalPrefix('xxx'); 设置全局路由前缀
  app.use(logger);               // 启用日志
  await app.listen(5859);
}
bootstrap();
