# TypeORM and MVC demonstration

## Dependencies

```
npm install --save @nestjs/typeorm typeorm mysql
npm install --save rxjs
```

## Add the TypeORM module to the `app` module

In `app.modue.ts`

1. Import the module
   ```
   import { TypeOrmModule } from '@nestjs/typeorm';
   ```

2. Add `TypeOrmModule` to the `imports` array:
   ```
    @Module({
        imports: [ TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [],
            synchronize: true,
            })],
        controllers: [AppController, BooksController],
        providers: [AppService],
    })
    export class AppModule {}
   ```

3. Configure the host, username, database and password.

4. If there are problem authenticating due to the error: 
    ```
     Client does not support authentication protocol requested by server; consider upgrading MySQL client
     ```

     Then perform the following steps inside the MySQL client:

     ```
     ALTER USER 'gitpod'@'%' IDENTIFIED WITH mysql_native_password BY '';
     FLUSH PRIVILEGES;
     ```


## Create an entitiy

An entity represents a table in the database.

Create and add the following file to `\src` folder. Save as `book.entity.ts`

```
/* A Book Entity */


import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  pageCount: number;

  @Column({ default: true })
  isAvailable: boolean;
}
```

After which, refer to it in your `app.module.ts`

```
{
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gitpod',
      password: '',
      database: 'test',
      entities: [Book],
      synchronize: true,
}

Inside the `app.module.ts` file,  add in ` TypeOrmModule.forFeature([Book])` into the `imports` array. This will allows
every controller in the `app.module.ts` to access the Book entity.

```

Now if we restart the NestJS app with `nest start`, the new table for the `Book` entity will be created.

## Inject the Repo

TypeORM provide a repository for each entity. It allows us to execute read, insert, update, delete and etc.

Before we can use the repository in our controller, we have to inject into our controller first:

```
  constructor(  
        @InjectRepository(Book)
        private booksRepository: Repository<Book>) {
    }
```

## Doing a READ:

Now we want to be able to access this entity in our `BooksController`.

Add the following to the BooksController:

```
 @Get()
    async getBooks() {
        let results = await this.booksRepository.find();
        return {
            books: results
        }
    }
```
