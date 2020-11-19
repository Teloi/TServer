import { Controller, Get, UseGuards, Res, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private systemService: SystemService) {

  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Get('baseInfo')
  async baseInfo(@Req() req: any) {
    return req.userInfo;
  }

  @Get('GetAppInfo')
  async getAppInfo() {
    return this.systemService.GetAppInfo();
  }

}
