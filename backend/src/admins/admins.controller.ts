import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminDto } from './dto/admin.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Get()
  async findAll() {
    return await this.adminsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminsService.findOne(id)
  }

  @Post('create')
  async create(@Body() adminDto: AdminDto) {
    return await this.adminsService.create(adminDto)
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() adminDto: AdminDto) {
    return await this.adminsService.update(id, adminDto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.adminsService.delete(id)
  }
}
