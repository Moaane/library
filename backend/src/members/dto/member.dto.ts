import { OmitType } from "@nestjs/mapped-types";
import { MemberEntity } from "../entities/member.entity";

export class MemberDto extends OmitType(MemberEntity, []) {
    id: string;
    address: string;
    email: string;
    name: string;
    phoneNumber: string;
    userId: string;
}