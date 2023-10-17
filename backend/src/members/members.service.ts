import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberDto } from './dto/member.dto';

@Injectable()
export class MembersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.members.findMany()
    }

    async findOne(userId: string) {
        return await this.prisma.members.findFirst({
            where: { userId }
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
