import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {

  @Get()
  getHell(): string {
    return "123Hello";
  }
  
  @Get("getHello")
  getHello(): string {
    return "123";
  }
}
