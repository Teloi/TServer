import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/core/utils/cryptogram';
import { User } from 'src/entity/db-main/user.entity';
import { jwtConstants } from 'src_config/jwt.config';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { LoginInput, RegisterInput } from '../account/account.class';
import { CacheService } from 'src/routes/tools/cache/cache.service';

@Injectable()
export class UserService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    @InjectRepository(User) private usersRepository: Repository<User>) {

  }

  // 查询所有用户
  async findAll() {
    return await this.usersRepository.find();
  }

  // 通过用户ID查询用户
  async findOneById(userId: string): Promise<User | undefined> {
    return await this.usersRepository.findOne(userId);
  }

  // 通过用户名查询用户
  async findOneByUserName(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ UserName: username });
  }

  // 通过手机号查询用户
  async findOneByUserMobile(mobile: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ Mobile: mobile });
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: RegisterInput): Promise<any> {

    if (requestBody.password !== requestBody.confirm) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }

    const user = await this.findOneByUserName(requestBody.mobile);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }

    const captcha = await this.cacheService.get(requestBody.mobile + this.cacheService.registerCache);
    if (captcha !== requestBody.captcha) {
      return {
        code: 400,
        msg: '验证码不正确!',
      };
    } else {
      this.cacheService.clear(requestBody.mobile + this.cacheService.registerCache);
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(requestBody.password, salt);  // 加密密码
    const insertUser = new User();
    insertUser.UserName = requestBody.mobile;
    insertUser.NickName = "用户" + new Date().getSeconds().toString();
    insertUser.Password = hashPwd;
    insertUser.SecurityStamp = salt;
    insertUser.Mobile = requestBody.mobile;
    insertUser.IsActive = true;
    insertUser.Email = requestBody.mail;
    insertUser.UserFace = null;

    // 保存
    try {
      await this.usersRepository.save(insertUser);
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (err) {
      // return {
      //   code: 503,
      //   msg: `Service error: ${err}`,
      // };
      throw new HttpException(err, 400);
    }
  }


  // JWT验证 - Step 2: 校验用户信息
  async validateUser(loginParmas: LoginInput): Promise<any> {

    if (loginParmas.type === 0) {
      // 使用用户名密码登录
      const user = await this.findOneByUserName(loginParmas.username);
      if (user) {
        const hashedPassword = user.Password;
        const salt = user.SecurityStamp;
        // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
        const hashPassword = encryptPassword(loginParmas.password, salt);
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
    }
    else {
      // 使用手机号验证码登录
      const user = await this.findOneByUserMobile(loginParmas.mobile);
      if (user) {
        const cacheCaptcha = await this.cacheService.get(loginParmas.mobile + this.cacheService.loginCache);
        await this.cacheService.clear(loginParmas.mobile + this.cacheService.loginCache);
        if (cacheCaptcha === loginParmas.captcha) {
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
    }

    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // 数据库签发 token
  async certificate(user: User) {
    const payload = { userId: user.Id, userName: user.UserName, nickName: user.NickName, role: user.Mobile };
    try {
      const token = this.jwtService.sign(payload);
      const refreshToken = jwt.sign(payload, jwtConstants.refreshSecret, { expiresIn: jwtConstants.longToken });
      return {
        code: 200,
        data: {
          id: payload.userId,
          name: payload.nickName,
          userName: payload.userName,
          token,
          refreshToken,
          expired: jwtConstants.longToken
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
