// 操作表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Operation {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @Column({ length: 30 })
  OperationName: string;

  // 菜单编码
  @Column({ length: 30 })
  OperationCode: string;

  @Column('bigint')
  ParentId: number;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;
}