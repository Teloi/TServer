import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

  }

  // 数据库插入压力测试
  async dbInsertUserTest() {
    const insertUser = new User();
    insertUser.UserName = '测试用户';
    insertUser.NickName = '昵称';
    insertUser.Password = 'XXXXXXXXXXXXXXXXXXX';
    insertUser.SecurityStamp = 'XXXXXXXX';
    insertUser.Mobile = '18888888888';
    insertUser.IsActive = true;
    insertUser.Email = '18888888888@qq.com';
    insertUser.UserFace = 'base64';
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

  // 数据库查询压力测试
  async dbSearchUserTest() {
    return await this.usersRepository.count();
  }
}
