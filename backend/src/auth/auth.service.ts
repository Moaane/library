import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) { }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { username: registerDto.username }
    })

    if (existingUser) {
      throw new BadRequestException("username already in use")
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const user = await this.prisma.users.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      }
    })

    const notification = await this.prisma.notifications.create({
      data: {
        userId: user.id,
        message: "Selamat Datang"
      }
    })

    return user
  }

  async login(loginDto: LoginDto) {
    const isUserValid = await this.prisma.users.findUnique({
      where: { username: loginDto.username }
    })

    if (!isUserValid) {
      throw new NotFoundException("user not found")
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password, isUserValid.password
    )

    if (!isPasswordValid) {
      return HttpStatus.UNAUTHORIZED
    }

    const payload = { sub: isUserValid.id, username: isUserValid.username, role: isUserValid.roles }

    return {
      access_token: await this.jwt.signAsync(payload)
    }
  }
}
