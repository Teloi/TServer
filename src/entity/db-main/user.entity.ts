import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
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
