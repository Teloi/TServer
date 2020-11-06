// 页面表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  // 菜单名称
  @Column({ length: 30 })
  MenuName: string;

  // 菜单编码
  @Column({ length: 30 })
  MenuCode: string;

  // 父菜单Id
  @Column('bigint')
  ParentId: number;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @ManyToMany(type => Permission, x => x.Menus)
  Permissions: Permission[];
}