import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('system')
export class SystemController {
  constructor() {

  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Get('baseInfo')
  async baseInfo() {
    
  }

}
