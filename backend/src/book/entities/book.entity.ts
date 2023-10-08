import { book as bookModel } from "@prisma/client";

export class BookEntity implements bookModel {
    id: string;
    title: string;
    synopsis: string;
    author: string;
    publisher: string;
    stock: number;
    isbn: string;
    isActive: number;
    publicationYear: number;
    filename: string;
}
