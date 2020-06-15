import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('xxx'); 设置全局路由前缀
  app.use(logger);               // 启用日志
  await app.listen(5859);
}
bootstrap();
