import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 128 })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({ length: 64 })
  email: string;
  
  @Column('tinyint')
  isActive: boolean;

  @Column()
  userFace: string;

  @UpdateDateColumn()
  lastModificationTime: Date;

  @CreateDateColumn()
  creationTime: Date;
}
