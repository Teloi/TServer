import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';
import { Repository } from 'typeorm';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {

  }

  // 查询所有用户
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // 查询用户是否存在
  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username: username });
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

    const user = await this.findOne(userName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    const insertUser = new User();
    insertUser.username = userName;
    insertUser.nickname = nickName;
    insertUser.password = hashPwd;
    insertUser.securityStamp = salt;
    insertUser.mobile = mobile;
    insertUser.isActive = true;
    insertUser.email = email;
    insertUser.userFace = userName;
    // 保存
    try {
      await this.usersRepository.save(insertUser);
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (err) {
      return {
        code: 503,
        msg: `Service error: ${err}`,
      };
    }

    // const registerSQL = `
    //   INSERT INTO admin_user
    //     (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
    //   VALUES
    //     ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    // `;
    // try {
    //   await sequelize.query(registerSQL, { logging: false });
    //   return {
    //     code: 200,
    //     msg: 'Success',
    //   };
    // } catch (error) {
    //   return {
    //     code: 503,
    //     msg: `Service error: ${error}`,
    //   };
    // }
  }
}
