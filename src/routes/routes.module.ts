import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { AccountController } from './account/account.controller';
import { ToolsController } from './tools/tools.controller';
import { AccountService } from './account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src_config/jwt.config';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from '../core/jwt/local.strategy';
import { JwtStrategy } from '../core/jwt/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    })],
  controllers: [ToolsController, AccountController, SystemController],
  providers: [AccountService, AuthService, LocalStrategy, JwtStrategy]
})
export class RoutesModule { }
