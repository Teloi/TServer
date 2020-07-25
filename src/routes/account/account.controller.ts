import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthService } from 'src/routes/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SmsService } from './sms.service';

@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly smsService: SmsService
  ) {

  }

  /**
   * 登录
   * @param loginParmas 参数待定
   */
  @Post('login')
  async login(@Body() loginParmas: any) {
    // 验证帐号密码
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    console.log(authResult);
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

  /**
   * 注册
   * @param body 参数待定
   */
  @Post("register")
  async register(@Body() body: any) {
    return await this.accountService.register(body);
  }

  /**
   * 使用refresh token 验证并签发 access token
   */
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refreshToken')
  async refreshToken(@Req() req: any) {
    const userId = req.userInfo.Id;
    const user = await this.accountService.findOneById(userId);
    return this.authService.certificate(user);
  }

  @Get('sendSmsDemo')
  async sendSmsDemo() {
    await this.smsService.sendOneSMS();
    return true;
  }
}
