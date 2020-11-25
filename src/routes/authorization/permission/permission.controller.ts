import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionService } from './permission.service';

@UseGuards(AuthGuard('jwt'))
@Controller('permission')
export class PermissionController {

  constructor(private permissionService: PermissionService) {

  }

  @Get('GetPermissions')
  async getPermissions() {
    return await this.permissionService.findPermissions();
  }

  @Post('AddPermission')
  async addPermission(@Body() input) {
    return await this.permissionService.addPermission(input.name);
  }

  @Post('EditPermission')
  async editPermission(@Body() input) {
    return await this.permissionService.editPermission(input);
  }
}
