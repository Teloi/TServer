// 用户角色关联

import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";
import { User } from "./user.entity";


@Entity()
export class UserRoleRel {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @ManyToOne(type => User, user => user.userRoles)
  @JoinColumn({name: 'UserId'})
  user: User;

  @ManyToOne(type => Role, role => role.userRoles)
  @JoinColumn({name: 'RoleId'})
  role: Role;
  

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;
}