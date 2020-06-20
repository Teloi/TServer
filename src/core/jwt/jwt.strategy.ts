import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../../src_config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: false
    });
  }

  // passReqToCallback:false
  async validate(payload) {
    return { userId: payload.sub, username: payload.username, realName: payload.realName, role: payload.role };
  }

  // passReqToCallback:false
  // async validate(req, payload, done) {
  //   // 当前日期
  //   const current = Math.floor(Date.now() / 1000);
  //   // 签发日期
  //   console.log(current, payload);
  //   const userInfo = { userId: payload.sub, username: payload.username, realName: payload.realName, role: payload.role };
  //   req.TSession = userInfo;
  //   // console.log(`JWT验证 - Step 4: 被守卫调用`, payload, callback);
  //   // return { userId: payload.sub, username: payload.username, realName: payload.realName, role: payload.role };
  //   done(null, userInfo);
  // }
}