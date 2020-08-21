import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity'

@Module({
  imports: [ 
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'gitpod',
            password: '',
            database: 'test',
            entities: [Book],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Book])
    ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
