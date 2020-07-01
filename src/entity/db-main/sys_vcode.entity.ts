import { PrimaryGeneratedColumn, Column } from "typeorm";

export class SysVcode {
  @PrimaryGeneratedColumn()
  Id: number;

  // 验证码分类
  @Column()
  CodeType: number;

  // 手机号
  PhoneNumber: string;

  // 验证码
  Code: string;

  // 状态
  Status: number;

  // 验证次数
  VerifyNum: number;

  // 验证日期
  VerifyTime: Date;

  CreateIp: string;

  Content: string;
}