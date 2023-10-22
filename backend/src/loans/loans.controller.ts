import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateLoanDto } from './dto/loan.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('loans')
@UseGuards(AuthGuard, RolesGuard)
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Roles(Role.USER, Role.ADMIN)
  @Get('create/:bookId')
  async create(@Param('bookId') bookId: string, @Req() req) {
    const userId = req.user.sub
    return await this.loansService.create(bookId, userId)
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get('active')
  async findAllActive(@Req() req) {
    const userId = req.user.sub
    return await this.loansService.findAllActive(userId)
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get('inactive')
  async findAllInActive(@Req() req) {
    const userId = req.user.sub
    return await this.loansService.findAllInActive(userId)
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get('search/:id')
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.sub
    return await this.loansService.findOne(id, userId)
  }

  @Roles(Role.ADMIN)
  @Get('return/:id')
  async returnBook(@Param('id') id: string) {
    return await this.loansService.returnBook(id)
  }

  @Roles(Role.ADMIN)
  @Get('all')
  async findAllAdmin() {
    return await this.loansService.findAllAdmin()
  }

  @Roles(Role.ADMIN)
  @Get('find/:id')
  async findOneAdmin(@Param('id') id: string) {
    return await this.loansService.findOneAdmin(id)
  }

  @Roles(Role.ADMIN)
  @Get('find/username/:username')
  async findAllByUsename(@Param('username') username: string) {
    return await this.loansService.findAllByUsername(username)
  }

  @Roles(Role.ADMIN)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return await this.loansService.update(id, updateLoanDto)
  }

  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.loansService.delete(id)
  }

}
