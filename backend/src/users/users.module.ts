import { Module, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
@UseGuards(AuthGuard)
export class UsersModule { }
