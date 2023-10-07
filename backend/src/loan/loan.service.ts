import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class LoanService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLoanDto: CreateLoanDto, bookId: string, userId: string, response: Response) {
    const book = await this.prisma.book.findFirst({
      where: { id: bookId }
    })

    if (book.stock < 1) {
      return response.status(200).json("The book is out of stock")
    }

    const loan = await this.prisma.loan.create({
      data: {
        ...createLoanDto,
        bookId,
        userId
      }
    })

    const newStock = book.stock - 1

    const updatedBook = await this.prisma.book.update({
      where: { id: book.id },
      data: {
        stock: newStock
      }
    })

    if (updatedBook.stock === 0) {
      await this.prisma.book.update({
        where: { id: updatedBook.id },
        data: {
          isActive: 0
        }
      })
    }

    return response.status(200).json("Loan successfully")
  }

  findAll() {
    return `This action returns all loan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
