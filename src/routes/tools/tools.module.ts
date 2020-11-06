import { Module } from '@nestjs/common';
import { SmsSenderService } from './sms-sender/sms-sender.service';

@Module({
  providers: [SmsSenderService]
})
export class ToolsModule {}
