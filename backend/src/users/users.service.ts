import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.users.findMany({
      where: { roles: 'USER' }
    });
  }

  async findOne(id: string) {
    return await this.prisma.users.findUnique({
      where: { id }
    });
  }

  async changeUsername(id: string, username: string) {
    const existingUsername = await this.prisma.users.findUnique({
      where: { username }
    })

    if (existingUsername) {
      throw new BadRequestException('Username already in use')
    }

    return await this.prisma.users.update({
      where: { id },
      data: {
        username: username
      },
      select: {
        username: true
      }
    })
  }

  async changePassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string) {
    const user = await this.prisma.users.findUnique({
      where: { id }
    })

    const isPasswordValid = await bcrypt.compare(
      oldPassword, user.password
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('password wrong')
    }

    if (newPassword.length < 6) {
      throw new BadRequestException('Passowrd is less than 6 characters')
    }

    if (confirmPassword !== newPassword) {
      throw new BadRequestException('Confirm password is not same')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updatedPassword = await this.prisma.users.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    })

    return updatedPassword

  }

  async remove(id: string) {
    return await this.prisma.users.delete({
      where: { id }
    });
  }
}
