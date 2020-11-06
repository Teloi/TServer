// 用户组
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from "typeorm";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @Column({ length: 64 })
  GroupName: string;

  @Column('bigint', { nullable: true })
  ParentId: number;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @JoinTable({
    name: "user_group_role_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "UserGroupId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "RoleId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => Role, x => x.UserGroups)
  Roles: Role[];

  @JoinTable({
    name: "user_group_user_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "UserGroupId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "UserId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => User, x => x.UserGroups)
  Users: User[];
}
