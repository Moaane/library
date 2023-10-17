import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  async findAll() {
    return await this.booksService.findAll()
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOne(id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.booksService.delete(id)
  }
}
