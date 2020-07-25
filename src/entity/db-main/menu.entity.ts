// 页面表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @Column({ length: 30 })
  MenuName: string;

  // 菜单编码
  @Column({ length: 30 })
  MenuCode: string;

  @Column('bigint')
  ParentId: number;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;
}