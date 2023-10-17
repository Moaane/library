import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays } from 'date-fns'
import { UpdateBookDto } from 'src/books/dto/book.dto';
import { UpdateLoanDto } from './dto/loan.dto';

@Injectable()
export class LoansService {
    constructor(private readonly prisma: PrismaService) { }

    async findAllActive(userId: string) {
        return await this.prisma.loans.findMany({
            where: { userId, isReturned: false }
        })
    }

    async findAllInActive(userId: string) {
        return await this.prisma.loans.findMany({
            where: { userId, isReturned: true }
        })
    }

    async findOne(id: string, userId: string) {

        const loan = await this.prisma.loans.findUnique({
            where: { id }
        })

        if (!loan || loan.userId !== userId) {
            throw new BadRequestException('Loan not found or user does not have access to this loan.');
        }

        return loan
    }

    async findAllAdmin() {
        return await this.prisma.loans.findMany()
    }

    async findOneAdmin(id: string) {
        return await this.prisma.loans.findUnique({
            where: { id }
        })
    }

    async findAllByUsername(username: string) {
        const user = await this.prisma.users.findUnique({
            where: { username }
        })

        return await this.prisma.loans.findMany({
            where: { userId: user.id }
        })
    }

    async create(bookId: string, userId: string) {
        const member = await this.prisma.members.findFirst({
            where: { userId }
        });

        if (member.name === null) {
            throw new BadRequestException('Pastikan mengisi profil terlebih dahulu');
        }

        const loan = await this.prisma.$transaction(async (prisma) => {
            const book = await prisma.books.findUnique({
                where: { id: bookId }
            });

            if (!book || book.stock < 1) {
                throw new BadRequestException('Stock buku habis');
            }

            const user = await prisma.users.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new NotFoundException('User tidak ditemukan');
            }

            const activeLoans = await prisma.loans.findMany({
                where: { userId, isReturned: false }
            });

            if (activeLoans.length > 0) {
                throw new BadRequestException('User memiliki peminjaman aktif');
            }

            const currentDate = new Date();
            const returnDate = addDays(currentDate, 7);

            const newLoan = await prisma.loans.create({
                data: {
                    loanDate: currentDate,
                    returnDate: returnDate,
                    userId,
                    bookId
                }
            });

            if (book.stock === 1) {
                await prisma.books.update({
                    where: { id: book.id },
                    data: { stock: 0, isActive: 0 }
                });
            } else {
                await prisma.books.update({
                    where: { id: book.id },
                    data: { stock: { decrement: 1 } }
                });
            }

            return newLoan;
        });

        return loan
    }

    async returnBook(id: string) {
        const loan = await this.prisma.loans.findUnique({
            where: { id }
        })

        if (!loan) {
            throw new NotFoundException('peminjaman tidak ditemukan')
        }

        if (loan.isReturned === true) {
            throw new BadRequestException('buku sudah dikembalikan')
        }

        const currentDate = new Date()
        const returnBook = await this.prisma.loans.update({
            where: { id: loan.id },
            data: {
                returnDate: currentDate,
                isReturned: true
            }
        })

        await this.prisma.books.update({
            where: { id: loan.bookId },
            data: { stock: { increment: 1 } }
        })

        return returnBook
    }

    async update(id: string, updateLoanDto: UpdateLoanDto) {
        const loan = await this.prisma.loans.findUnique({
            where: { id }
        });
    
        if (!loan) {
            throw new NotFoundException('peminjaman tidak ditemukan');
        }
    
        if (loan.isReturned === true) {
            throw new BadRequestException('buku sudah dikembalikan');
        }
    
        const { numberOfDaysToAdd } = updateLoanDto; // asumsikan Anda memiliki field numberOfDaysToAdd di DTO Anda
        const currentDate = new Date(loan.returnDate); // konversi returnDate ke objek Date
        const newReturnDate = addDays(currentDate, numberOfDaysToAdd); // tambahkan jumlah hari
    
        // Perbarui data peminjaman dengan returnDate yang baru
        const updatedLoan = await this.prisma.loans.update({
            where: { id },
            data: { returnDate: newReturnDate }
        });
    
        return updatedLoan;
    }

    async delete(id: string) {
        return await this.prisma.loans.delete({
            where: { id }
        })
    }

}
