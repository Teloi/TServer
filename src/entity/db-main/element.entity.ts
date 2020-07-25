// 页面元素表

import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Element {
  @PrimaryGeneratedColumn({ type: "bigint" })
  Id: number;

  @Column({ length: 30 })
  ElementName: string;

  // 菜单编码
  @Column({ length: 30 })
  ElementCode: string;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;
}