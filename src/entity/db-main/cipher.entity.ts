import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity()
export class Cipher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 512 })
  webSite: string;

  @Column({ length: 1024 })
  describe: string;

  @Column({ length: 100 })
  account: string;

  @Column({ length: 50 })
  pwd: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ length: 256 })
  email: string;

  @Column({ length: 1024 })
  safeInfo: string;

  @UpdateDateColumn()
  lastModificationTime: Date;

  @CreateDateColumn()
  creationTime: Date;
}