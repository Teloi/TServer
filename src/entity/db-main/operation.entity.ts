// 操作表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Operation {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  // 操作名称
  @Column({ length: 30 })
  OperationName: string;

  // 操作编码
  @Column({ length: 30 })
  OperationCode: string;

  // 父操作Id
  @Column('bigint')
  ParentId: number;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;

  @ManyToMany(type => Permission, x => x.Operations)
  Permissions: Permission[];
}