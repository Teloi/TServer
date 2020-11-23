export class LoginInput {
  type: number;
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export class RegisterInput {
  readonly mobilePrefix: string;
  readonly captcha: string;
  readonly password: string;
  readonly confirm: string;
  readonly mobile: string;
  readonly mail: string;
}