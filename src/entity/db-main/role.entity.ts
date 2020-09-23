
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserRoleRel } from "./user_role_rel.entity";

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

  @OneToMany(type => UserRoleRel, userRole => userRole.role)
  userRoles: UserRoleRel[];
}