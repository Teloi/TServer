import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from 'src/routes/tools/cache/cache.service';
import { UserService } from '../user/user.service';
import { LoginInput, RegisterInput } from './account.class';

@Controller('account')
export class AccountController {

  constructor(
    private readonly userService: UserService,
    private readonly cacheService: CacheService
  ) {

  }

  /**
   * 登录
   * @param loginParmas 参数待定
   */
  @Post('login')
  async login(@Body() loginParmas: LoginInput) {
    // 验证帐号密码
    const authResult = await this.userService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1: {
        // 签发 Token
        return this.userService.certificate(authResult.user);
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
  async register(@Body() body: RegisterInput) {
    return await this.userService.register(body);
  }

  /**
   * 使用refresh token 验证并签发 access token
   */
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refreshToken')
  async refreshToken(@Req() req: any) {
    const userId = req.userInfo.Id;
    const user = await this.userService.findOneById(userId);
    return this.userService.certificate(user);
  }

  @Get('sendLoginSMS')
  async sendLoginSMS(@Req() req: any) {
    this.cacheService.set('phoneNumber', '123445', 600);
    return true;
  }
}
