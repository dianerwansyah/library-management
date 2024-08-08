// src/borrow/borrow.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Member } from '../members/member.entity';
import { Book } from '../books/book.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;

  @Column({ type: 'date' })
  borrowDate: Date;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;

  @Column({ type: 'int', default: 0 })
  penalty: number;
}
