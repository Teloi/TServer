import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('system')
export class SystemController {
  constructor() {

  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Get('baseInfo')
  async baseInfo(@Req() req: any) {
    return req.userInfo;
    // return req.TSession;
  }

  @UseGuards(AuthGuard('jwt-refresh')) // 使用 'JWT' 进行验证
  @Get('bbs')
  async baseInfo2(@Req() req: any) {
    return req.userInfo;
    // return req.TSession;
  }

}
