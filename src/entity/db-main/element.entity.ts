// 页面元素表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Element {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  // 页面元素名称
  @Column({ length: 30 })
  ElementName: string;

  // 元素编码
  @Column({ length: 30 })
  ElementCode: string;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @ManyToMany(type => Permission, x => x.Elements)
  Permissions: Permission[];
}