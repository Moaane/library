import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createBookDto: CreateBookDto) {
        return await this.prisma.books.create({
            data: createBookDto
        })
    }

    async findAll() {
        return await this.prisma.books.findMany()
    }

    async findOne(id: string) {
        return await this.prisma.books.findUnique({
            where: { id }
        })
    }

    async update(id: string, updateBookDto: UpdateBookDto,) {
        const updatedBook = await this.prisma.books.update({
            where: { id },
            data: updateBookDto
        })

        if (updatedBook.stock === 0) {
            return await this.prisma.books.update({
                where: { id },
                data: { isActive: 0 }
            })
        } else if (updatedBook.stock > 0) {
            return await this.prisma.books.update({
                where: { id },
                data: { isActive: 1 }
            })
        }
    }

    async delete(id: string) {
        return await this.prisma.books.delete({
            where: { id }
        })
    }
}
