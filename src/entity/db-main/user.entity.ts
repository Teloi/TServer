import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";

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
}
