import { Controller, Get } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';
@Controller('books')
export class BooksController {

    // inject the repository
    constructor(  
        @InjectRepository(Book)
        private booksRepository: Repository<Book>) {
    }

    @Get()
    async getBooks() {
        let results = await this.booksRepository.find();
        return {
            books: results
        }
    }

}
