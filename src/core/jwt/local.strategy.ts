import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/routes/authorization/user/user.service';
import { LoginInput } from 'src/routes/authorization/account/account.class';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const input = new LoginInput;
    input.type = 0;
    input.username = username;
    input.password = password;
    const user = await this.userService.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}