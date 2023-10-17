import { members as MemberModel} from "@prisma/client";

export class MemberEntity implements MemberModel {
    id: string;
    address: string;
    email: string;
    name: string;
    phoneNumber: string;
    userId: string;
}