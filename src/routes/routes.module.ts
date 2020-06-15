import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { AccountController } from './account/account.controller';
import { ToolsController } from './tools/tools.controller';


@Module({
  imports: [],
  controllers: [ToolsController, AccountController, SystemController],
  providers: []
})
export class RoutesModule { }
