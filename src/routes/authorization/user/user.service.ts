import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/core/utils/cryptogram';
import { User } from 'src/entity/db-main/user.entity';
import { jwtConstants } from 'src_config/jwt.config';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

  constructor(
    private readonly jwtService: JwtService,
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

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { userName, nickName, password, repassword, mobile, email } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }

    const user = await this.findOneByUserName(userName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    const insertUser = new User();
    insertUser.UserName = userName;
    insertUser.NickName = nickName;
    insertUser.Password = hashPwd;
    insertUser.SecurityStamp = salt;
    insertUser.Mobile = mobile;
    insertUser.IsActive = true;
    insertUser.Email = email;
    insertUser.UserFace = userName;

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
      throw new HttpException('注册请求失败!', 400);
    }
  }


  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOneByUserName(username);
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
