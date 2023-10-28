import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  async findAll() {
    return await this.booksService.findAll()
  }

  @Get('find/:bookId')
  async findOne(@Param('bookId') id: string) {
    return await this.booksService.findOne(id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('update/:bookId')
  async update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(bookId, updateBookDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.booksService.delete(id)
  }
}
