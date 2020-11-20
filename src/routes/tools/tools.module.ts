import { Module } from '@nestjs/common';
import { SmsSenderService } from './sms-sender/sms-sender.service';
import { CacheService } from './cache/cache.service';

@Module({
  providers: [SmsSenderService, CacheService],
  exports: [SmsSenderService, CacheService]
})
export class ToolsModule { }

