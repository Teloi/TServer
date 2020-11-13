import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';
import { Repository, Transaction, Connection } from 'typeorm';
import { UserGroup } from 'src/entity/db-main/user_group.entity';

@Injectable()
export class SystemService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserGroup) private userGruopRepository: Repository<UserGroup>
  ) {

  }

  // 数据库插入压力测试
  @Transaction()
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

    const insertUserGroup = new UserGroup();
    insertUserGroup.GroupName = 'Groupffffffffffff';
    try {
      // await this.usersRepository.save(insertUser);
      // await this.userGruopRepository.save(insertUserGroup);

      await this.connection.transaction(async manager => {
        await manager.save(insertUser);
        await manager.save(insertUserGroup);
      });
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
