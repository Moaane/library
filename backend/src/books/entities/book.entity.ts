import { books as BookModel } from "@prisma/client";

export class BookEntity implements BookModel {
    id: string;
    title: string;
    author: string;
    filename: string;
    isActive: number;
    isbn: string;
    publicationYear: number;
    publisher: string;
    stock: number;
    synopsis: string;
}