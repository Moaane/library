import { loans } from "@prisma/client";

export class LoanEntity implements loans {
    id: string;
    bookId: string;
    isReturned: boolean;
    loanDate: Date;
    returnDate: Date;
    userId: string;
}