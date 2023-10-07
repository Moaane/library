import { OmitType } from "@nestjs/mapped-types";
import { BookEntity } from "../entities/book.entity";

export class BookDto extends OmitType(BookEntity, []) {
    title: string
    publisher: string
    publicationYear: number
    author: string
    isbn: string
    synopsis: string
    stock: number
}
