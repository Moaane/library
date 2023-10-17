import { OmitType } from "@nestjs/mapped-types";
import { LoanEntity } from "../entities/loan.entity";

export class UpdateLoanDto extends OmitType(LoanEntity, []) {
    numberOfDaysToAdd: number
}