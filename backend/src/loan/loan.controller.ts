import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Response } from 'express';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) { }

  @Post('create/:bookId/:userId')
  async create(@Res() response: Response, @Param('bookId, userId') bookId: string, userId: string, @Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto, bookId, userId, response);
  }

  @Get()
  async findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanService.remove(+id);
  }
}
