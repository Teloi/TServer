// 用户组


import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
}