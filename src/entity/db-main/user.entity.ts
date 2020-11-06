import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Role } from "./role.entity";
import { UserGroup } from "./user_group.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @Column({ length: 20 })
  UserName: string;

  @Column({ length: 20 })
  NickName: string;

  @Column({ length: 128 })
  Password: string;

  @Column({ length: 128 })
  SecurityStamp: string;

  @Column({ length: 64 })
  Email: string;

  @Column({ length: 20 })
  Mobile: string;

  @Column('tinyint')
  IsActive: boolean;

  @Column()
  UserFace: string;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @JoinTable({
    name: "user_role_rel", // table name for the junction table of this relation
    joinColumn: {
      name: "UserId",
      referencedColumnName: "Id"
    },
    inverseJoinColumn: {
      name: "RoleId",
      referencedColumnName: "Id"
    }
  })
  @ManyToMany(type => Role, x => x.Users)
  Roles: Role[];

  @ManyToMany(type => UserGroup, x => x.Users)
  UserGroups: UserGroup[];
}
