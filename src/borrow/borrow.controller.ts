// src/borrow/borrow.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { Borrow } from './borrow.entity';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  borrowBook(@Body() borrow: { memberId: number, bookId: number }): Promise<Borrow> {
    return this.borrowService.borrowBook(borrow.memberId, borrow.bookId);
  }

  @Post('return')
  returnBook(@Body() borrowId: number): Promise<Borrow> {
    return this.borrowService.returnBook(borrowId);
  }

  @Get()
  getAll(): Promise<Borrow[]> {
    return this.borrowService.getAllBorrows();
  }
}
