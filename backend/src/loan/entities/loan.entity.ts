import { loan as loanModel } from "@prisma/client";

export class LoanEntity implements loanModel {
    id: string;
    loanDate: Date;
    returnDate: Date;
    bookId: string;
    userId: string;
}
