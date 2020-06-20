import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';
import { Repository } from 'typeorm';
import { makeSalt, encryptPassword } from 'src/core/utils/cryptogram';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {

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
      return {
        code: 503,
        msg: `Service error: ${err}`,
      };
    }
  }
}
