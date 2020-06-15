import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService) {

  }

  @Get()
  getHell(): string {
    return "123Hello";
  }

  @Get("login")
  getHello() {
    return this.accountService.findAll();
  }

  @Post("register")
  async register(@Body() body: any) {
    return await this.accountService.register(body);
  }
}
