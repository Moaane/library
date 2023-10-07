import { OmitType } from "@nestjs/mapped-types";
import { LoanEntity } from "../entities/loan.entity";

export class CreateLoanDto extends OmitType(LoanEntity, []) {
    returnDate: Date
    bookId: string
    userId: string
}
