import { OmitType } from "@nestjs/mapped-types";
import { LoanEntity } from "../entities/loan.entity";

export class UpdateLoanDto extends OmitType(LoanEntity, [
    'bookId', 'id', 'isReturned', 'loanDate', 'userId'
]) {
    numberOfDaysToAdd: number
}