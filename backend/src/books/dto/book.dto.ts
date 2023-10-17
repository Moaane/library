import { OmitType } from "@nestjs/mapped-types";
import { BookEntity } from "../entities/book.entity";

export class CreateBookDto extends OmitType(BookEntity, []) {
    title: string
    publisher: string
    publicationYear: number
    author: string
    synopsis: string
    stock: number
    isbn: string
    filename: string
}

export class UpdateBookDto extends OmitType(BookEntity, []) {
    title: string
    publisher: string
    publicationYear: number
    author: string
    synopsis: string
    stock: number
    isbn: string
    filename: string
}