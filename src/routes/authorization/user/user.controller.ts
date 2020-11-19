import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {

  }

  @UseGuards(AuthGuard('jwt'))
  @Get('GetUsers')
  async getUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('GetUsers401')
  async getUsers401() {
    return await this.userService.findAll();
  }
}
