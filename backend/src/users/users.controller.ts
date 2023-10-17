import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard,RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Roles(Role.USER, Role.ADMIN)
  @Get('profile')
  async findOneUser(@Req() req) {
    const id = req.user.sub
    return this.usersService.findOne(id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Patch('update-username')
  async changeUsername(@Req() req, @Body('username') username: string) {
    const id = req.user.sub
    return await this.usersService.changeUsername(id, username)
  }

  @Roles(Role.USER, Role.ADMIN)
  @Patch('update-password')
  async changePassword(@Req() req, @Body('oldPassword: string, newPassword: string, confirmPassword: string') oldPassword: string, newPassword: string, confirmPassword: string) {
    const id = req.user.sub
    return await this.usersService.changePassword(id, oldPassword, newPassword, confirmPassword)
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id)
  }

  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
