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
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
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

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post("register")
  async register(@Body() body: any) {
    return await this.accountService.register(body);
  }
}
