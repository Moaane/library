import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberDto } from './dto/member.dto';

@Injectable()
export class MembersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.members.findMany()
    }

    async findOne(userId: string,) {
        const existingMember = await this.prisma.members.findUnique({
            where: { userId }
        })

        if (!existingMember) {
            throw HttpStatus.NO_CONTENT
        }

        return existingMember
    }

    async findOneByAdmin(userId: string) {
        return await this.prisma.members.findUnique({
            where: { userId },
            include: {
                users: {
                    select: {
                        username: true,
                        roles: true
                    }
                }
            }
        })
    }

    async create(userId: string, memberDto: MemberDto) {
        return await this.prisma.members.create({
            data: {
                ...memberDto,
                userId
            }
        })
    }

    async updateMember(userId: string, memberDto: MemberDto) {
        const member = await this.prisma.members.findFirst({
            where: { userId }
        })

        if (!member) {
            throw new NotFoundException('member not found')
        }

        return await this.prisma.members.update({
            where: { id: member.id },
            data: memberDto
        })
    }

}
