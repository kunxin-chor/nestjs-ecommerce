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