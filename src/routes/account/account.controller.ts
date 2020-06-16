import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthService } from 'src/routes/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService, private readonly authService: AuthService) {

  }

  @Post('login')
  async login(@Body() loginParmas: any) {
    // 验证帐号密码
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1: {
        // 签发 Token
        return this.authService.certificate(authResult.user);
      }
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @Post("register")
  async register(@Body() body: any) {
    return await this.accountService.register(body);
  }
}
