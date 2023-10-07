import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "../entities/user.entity";

export class AuthDto extends OmitType(UserEntity, []) {
    username:  string
    password:  string
}
