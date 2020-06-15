import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { AccountController } from './account/account.controller';
import { ToolsController } from './tools/tools.controller';
import { LogsController } from './logs/logs.controller';


@Module({
  imports: [],
  controllers: [ToolsController, AccountController, SystemController, LogsController],
  providers: []
})
export class RoutesModule { }
