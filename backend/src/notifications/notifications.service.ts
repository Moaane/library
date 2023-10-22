import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(userId: string) {
        return await this.prisma.notifications.findMany({
            where: { userId }
        })
    }

    async findOne(userId: string, notificationId: string) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId }
        })

        if (!user) {
            throw new NotFoundException('user tidak ditemukan')
        }

        const isRead = await this.prisma.notifications.update({
            where: { id: notificationId },
            data: { isRead: true }
        })

        return await this.prisma.notifications.findUnique({
            where: { id: notificationId }
        })
    }

    async delete(userId: string, notificationId: string) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId }
        })

        if (!user) {
            throw new NotFoundException('user tidak ditemukan')
        }

        return await this.prisma.notifications.delete({
            where: { id: notificationId }
        })
    }

}
