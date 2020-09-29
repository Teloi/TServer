import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { main, test } from '../src_config/ormconfig';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(main),
    TypeOrmModule.forRoot(test),
    RoutesModule
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {
}
