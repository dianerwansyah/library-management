// src/borrow/borrow.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';
import { Member } from '../members/member.entity';
import { Book } from '../books/book.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async borrowBook(memberId: number, bookId: number): Promise<Borrow> {
    const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ['borrows'] });
    if (!member) {
      throw new Error('Member not found');
    }

    if (member.borrows.length >= 2) {
      throw new Error('Member cannot borrow more than 2 books');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId, stock: 1 } });
    if (!book) {
      throw new Error('Book not available or already borrowed');
    }

    const borrow = new Borrow();
    borrow.member = member;
    borrow.book = book;
    borrow.borrowDate = new Date();

    book.stock -= 1;
    await this.bookRepository.save(book);

    return this.borrowRepository.save(borrow);
  }

  async returnBook(borrowId: number): Promise<Borrow> {
    const borrow = await this.borrowRepository.findOne({ where: { id: borrowId }, relations: ['member', 'book'] });
    if (!borrow) {
      throw new Error('Borrow record not found');
    }

    const returnDate = new Date();
    borrow.returnDate = returnDate;

    const borrowDuration = Math.floor((returnDate.getTime() - borrow.borrowDate.getTime()) / (1000 * 60 * 60 * 24));
    if (borrowDuration > 7) {
      borrow.penalty = 1;
    }

    borrow.book.stock += 1;
    await this.bookRepository.save(borrow.book);

    return this.borrowRepository.save(borrow);
  }

  async getAllBorrows(): Promise<Borrow[]> {
    return this.borrowRepository.find({ relations: ['member', 'book'] });
  }
}
