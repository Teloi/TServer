// 权限表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Menu } from "./menu.entity";
import { Element } from "./element.entity";
import { Operation } from "./operation.entity";
import { Role } from "./role.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  // 权限类型 (菜单 menu 元素 element 操作 operation)
  @Column({ length: 30 })
  PermissionType: string;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @JoinTable({
    name: "permission_menu_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "PermissionId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "MenuId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => Menu, x => x.Permissions)
  Menus: Menu[];

  @JoinTable({
    name: "permission_element_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "PermissionId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "ElementId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => Element, x => x.Permissions)
  Elements: Element[];

  @JoinTable({
    name: "permission_operation_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "PermissionId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "OperationId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => Operation, x => x.Permissions)
  Operations: Operation[];

  @ManyToMany(type => Role, x => x.Permissions)
  Roles: Role[];
}
