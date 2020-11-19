import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { main, test } from '../src_config/ormconfig';
import { option } from '../src_config/redis.config';
import { RedisModule } from 'nestjs-redis/dist/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(main),
    TypeOrmModule.forRoot(test),
    RedisModule.register(option),
    RoutesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
