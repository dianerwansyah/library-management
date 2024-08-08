// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './members/member.entity';
import { Book } from './books/book.entity';
import { Borrow } from './borrow/borrow.entity';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Host MySQL
      port: 3306, // Port MySQL
      username: 'root', // Username MySQL
      password: '', // Password MySQL
      database: 'library_management', // Nama database MySQL
      entities: [Member, Book, Borrow], // Entitas Anda
      synchronize: true, // Set ke false untuk produksi
    }),
    MembersModule,
    BooksModule,
    BorrowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
