import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entity/db-main/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>) {
  }

  // 查询所有角色
  async findPermissions() {
    return await this.permissionRepository.find();
  }

  // 新增权限
  async addPermission(permissionName: string): Promise<boolean> {
    const p = new Permission();
    p.Name = permissionName;
    p.ParentId = -1;
    this.permissionRepository.insert(p);
    return true;
  }

  async editPermission(input: Permission) {
    const p = await this.permissionRepository.findOne(input.Id);
    p.Name = input.Name;
    p.Remark = input.Remark;
    await this.permissionRepository.save(p);
  }
}
