import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [PrismaModule, AuthModule, BookModule, LoanModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
