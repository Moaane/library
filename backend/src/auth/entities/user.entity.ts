import { user as userModel} from "@prisma/client";

export class UserEntity implements userModel {
    id: string;
    password: string;
    username: string;
}
