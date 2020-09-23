import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity()
export class Cipher {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 512 })
  WebSite: string;

  @Column({ length: 1024 })
  Describe: string;

  @Column({ length: 100 })
  Account: string;

  @Column({ length: 50 })
  Pwd: string;

  @Column({ length: 20 })
  PhoneNumber: string;

  @Column({ length: 256 })
  Email: string;

  @Column({ length: 1024 })
  SafeInfo: string;

  @UpdateDateColumn()
  LastModificationTime: Date;

  @CreateDateColumn()
  CreationTime: Date;
}