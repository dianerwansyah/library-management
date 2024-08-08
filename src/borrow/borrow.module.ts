// src/borrow/borrow.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { Borrow } from './borrow.entity';
import { Member } from '../members/member.entity';
import { Book } from '../books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Member, Book])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
