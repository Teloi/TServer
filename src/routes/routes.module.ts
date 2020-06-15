import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { AccountController } from './account/account.controller';
import { ToolsController } from './tools/tools.controller';
import { AccountService } from './account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ToolsController, AccountController, SystemController],
  providers: [AccountService]
})
export class RoutesModule { }
