import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "src/users/entities/user.entity";

export class AdminDto extends OmitType(UserEntity,[]) {
    username: string
    password: string
}