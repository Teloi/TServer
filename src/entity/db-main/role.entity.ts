
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";
import { UserGroup } from "./user_group.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @Column()
  Name: string;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @JoinTable({
    name: "role_permission_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "RoleId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "PermissionId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => Permission, x => x.Roles)
  Permissions: Permission[];

  @ManyToMany(type => User, x => x.Roles)
  Users: User[];

  @ManyToMany(type => UserGroup, x => x.Roles)
  UserGroups: UserGroup[];
}
