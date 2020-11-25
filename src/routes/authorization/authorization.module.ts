import { Module } from '@nestjs/common';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { ElementController } from './element/element.controller';
import { ElementService } from './element/element.service';
import { OperationService } from './operation/operation.service';
import { OperationController } from './operation/operation.controller';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity/db-main/role.entity';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserGroupController } from './user-group/user-group.controller';
import { UserGroupService } from './user-group/user-group.service';
import { User } from 'src/entity/db-main/user.entity';
import { UserGroup } from 'src/entity/db-main/user_group.entity';
import { AccountController } from './account/account.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src_config/jwt.config';
import { Menu } from 'src/entity/db-main/menu.entity';
import { ToolsModule } from '../tools/tools.module';
import { Permission } from 'src/entity/db-main/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, UserGroup, Menu, Permission]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'userInfo' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.shortToken }, // token 过期时效
    }),
    ToolsModule
  ],
  controllers: [MenuController, ElementController, OperationController, RoleController, PermissionController, UserController, UserGroupController, AccountController],
  providers: [UserService, MenuService, ElementService, OperationService, RoleService, PermissionService, UserGroupService],
  exports: [
    PassportModule, JwtModule, UserService, MenuService, ElementService, OperationService, RoleService, PermissionService, UserGroupService
  ]
})
export class AuthorizationModule { }
