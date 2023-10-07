import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async create(@Body() bookDto: BookDto) {
    return this.bookService.create(bookDto);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Get()
  async findAllAsc() {
    return this.bookService.findAllAsc();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() bookDto: BookDto) {
    return this.bookService.update(id, bookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
