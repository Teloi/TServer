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

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('dbInsertUserTest')
  async dbInsertUserTest(@Req() req: any) {
    return this.systemService.dbInsertUserTest();
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Get('dbSearchUserTest')
  async dbSearchUserTest(@Req() req: any) {
    return this.systemService.dbSearchUserTest();
  }

  // 使用Refresh token 验证
  @UseGuards(AuthGuard('jwt-refresh')) // 使用 'JWT' 进行验证
  @Get('bbs')
  async baseInfo2(@Req() req: any) {
    return req.userInfo;
    // return req.TSession;
  }

  
  @Get('sendFileTest')
  async sendFileTest(@Res() res){
    res.sendFile("absolute path");
  }

}
