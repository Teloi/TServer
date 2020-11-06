import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { LocalStrategy } from '../core/jwt/local.strategy';
import { JwtStrategy } from '../core/jwt/jwt.strategy';
import { SystemService } from './system/system.service';
import { JwtRefreshStrategy } from '../core/jwt/jwt-refresh.stratehy';
import { EventsGateway } from './socket/events.gateway';
import { AuthorizationModule } from './authorization/authorization.module';
import { ToolsModule } from './tools/tools.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/db-main/user.entity';
import { Role } from 'src/entity/db-main/role.entity';
import { UserGroup } from 'src/entity/db-main/user_group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, UserGroup]),
    AuthorizationModule,
    ToolsModule
  ],
  controllers: [
    SystemController
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    SystemService,
    EventsGateway
  ]
})
export class RoutesModule { }
