export class LoginInput {
  readonly username: string;
  readonly password: string;
}

export class RegisterInput {
  readonly mobilePrefix: string;
  readonly captcha: string;
  readonly password: string;
  readonly confirm: string;
  readonly mobile: string;
  readonly mail: string;
}