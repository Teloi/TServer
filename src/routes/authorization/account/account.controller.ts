import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('account')
export class AccountController {

  constructor(
    private readonly userService: UserService
  ) {

  }

  /**
   * 登录
   * @param loginParmas 参数待定
   */
  @Post('login')
  async login(@Body() loginParmas: any) {
    // 验证帐号密码
    const authResult = await this.userService.validateUser(loginParmas.username, loginParmas.password);
    console.log(authResult);
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
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }

  /**
   * 使用refresh token 验证并签发 access token
   */
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refreshToken')
  async refreshToken(@Req() req: any) {
    const userId = req.userInfo.Id;
    const user = await this.userService.findOneById(userId);
    return this.userService.certificate(user);
  }
}
