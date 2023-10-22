import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { AdminsModule } from './admins/admins.module';
import { MembersModule } from './members/members.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, BooksModule, LoansModule, AdminsModule, MembersModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
