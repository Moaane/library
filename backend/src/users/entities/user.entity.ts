import { $Enums, users as UserModel} from "@prisma/client";

export class UserEntity implements UserModel {
    id: string;
    username: string;
    password: string;
    roles: $Enums.Role;
}
