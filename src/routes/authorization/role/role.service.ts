import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/db-main/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
  }

  // 查询所有角色
  async findRoles() {
    return await this.roleRepository.find();
  }

  // 新增角色
  async addRole(roleName: string): Promise<boolean> {
    const role = new Role();
    role.Name = roleName;
    this.roleRepository.insert(role);
    return true;
  }

}
