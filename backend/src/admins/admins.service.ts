import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt'
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Injectable()
export class AdminsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(adminDto: AdminDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: { username: adminDto.username }
        })

        if (existingUser) {
            throw new BadRequestException("username already in use")
        }

        const hashedPassword = await bcrypt.hash(adminDto.password, 10)

        return await this.prisma.users.create({
            data: {
                ...adminDto,
                password: hashedPassword,
                roles: 'ADMIN'
            }
        })
    }

    async findAll() {
        return await this.prisma.users.findMany({
            where: { roles: 'ADMIN' }
        })
    }

    async findOne(id: string) {
        return await this.prisma.users.findUnique({
            where: { id }
        })
    }

    async update(id: string, adminDto: AdminDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: { username: adminDto.username }
        })

        if (existingUser) {
            throw new BadRequestException("username already in use")
        }

        const hashedPassword = await bcrypt.hash(adminDto.password, 10)

        return await this.prisma.users.update({
            where: { id },
            data: {
                ...adminDto,
                username: adminDto.username,
                password: hashedPassword
            }
        })
    }

    async delete(id: string) {
        return await this.prisma.users.delete({
            where: { id }
        })
    }
}
