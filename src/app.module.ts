import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { main, test } from '../src_config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(main),
    TypeOrmModule.forRoot(test),
    RoutesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
