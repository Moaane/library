import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) { }

  async create(bookDto: BookDto) {
    return await this.prisma.book.create({
      data: bookDto
    });
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async findAllAsc() {
    const book = await this.prisma.book.findMany({
      orderBy: [
        {
          title: 'asc', // 'asc' untuk mengurutkan secara ascending (A-Z)
        },
      ],
    });

    return book;
  }

  async findOne(id: string) {
    return await this.prisma.book.findFirst({
      where: { id }
    });
  }

  async update(id: string, bookDto: BookDto) {
    return await this.prisma.book.update({
      where: { id },
      data: bookDto
    });
  }

  async remove(bookId: string) {
    return await this.prisma.book.delete({
      where: { id: bookId }
    });
  }
}
