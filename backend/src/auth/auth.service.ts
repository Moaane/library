import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt'
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  async register(authDto: AuthDto, response: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: authDto.username }
    })

    if (existingUser) {
      return response.status(409).json({ message: "Username is already taken" })
    }

    const hashedPassword = await bcrypt.hash(authDto.password, 10)

    const user = await this.prisma.user.create({
      data: {
        ...authDto,
        password: hashedPassword,
      }
    })

    return response.status(201).json({ message: "Register successfully" })
  }

  async login(authDto: AuthDto, response: Response) {
    const isUserValid = await this.prisma.user.findUnique({
      where: { username: authDto.username }
    })

    if (!isUserValid) {
      return response.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      authDto.password, isUserValid.password
    )

    if (!isPasswordValid) {
      return response.status(401).json({ message: "Wrong password" })
    }

    return response.status(200).json({ message: "Login Successfully" })
  }
}
