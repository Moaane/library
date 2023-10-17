import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { MemberDto } from './dto/member.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('')
  async findAll() {
    return this.membersService.findAll()
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get('find')
  async findOneMember(@Req() req) {
    const userId = req.user.sub
    return await this.membersService.findOne(userId)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('find/:userId')
  async findOne(@Param('userId') userId: string) {
    return await this.membersService.findOne(userId)
  }

  @Roles(Role.USER, Role.ADMIN)
  @Patch('update')
  async updateMember(@Req() req, @Body() memberDto: MemberDto) {
    const userId = req.user.sub
    return this.membersService.updateMember(userId, memberDto)
  }
}
