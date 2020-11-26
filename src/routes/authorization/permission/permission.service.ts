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
    p.ParentId = 0;
    this.permissionRepository.insert(p);
    return true;
  }

  // 编辑权限
  async editPermission(input: Permission) {
    if (input.Id !== null && input.Id !== undefined) {
      const p = await this.permissionRepository.findOne(input.Id);
      p.Name = input.Name;
      p.Remark = input.Remark;
      await this.permissionRepository.save(p);
    }
    else {
      const newP = new Permission();
      newP.Name = input.Name;
      newP.ParentId = input.ParentId;
      newP.Remark = input.Remark;
      await this.permissionRepository.insert(newP);
    }

    return true;
  }

  async deletePermission(input: Permission): Promise<boolean> {
    if (input.Id !== null && input.Id !== undefined) {
      const p = await this.permissionRepository.findOne(input.Id);
      await this.permissionRepository.remove(p);
    }
    else {
      throw new Error("Id 不存在");
    }

    return true;
  }
}
