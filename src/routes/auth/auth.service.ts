import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../core/utils/cryptogram';
import { User } from 'src/entity/db-main/user.entity';
import { jwtConstants } from 'src_config/jwt.config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService, private readonly jwtService: JwtService) { }

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.accountService.findOne(username);
    if (user) {
      const hashedPassword = user.Password;
      const salt = user.SecurityStamp;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: User) {
    const payload = { userId: user.Id, username: user.UserName, nickName: user.NickName, role: user.Mobile };
    console.log('JWT验证 - Step 3: 处理 jwt 签证', payload);
    try {
      const token = this.jwtService.sign(payload);
      const refreshToken = jwt.sign(payload, jwtConstants.refreshSecret, { expiresIn: jwtConstants.longToken });
      return {
        code: 200,
        data: {
          token,
          refreshToken
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}