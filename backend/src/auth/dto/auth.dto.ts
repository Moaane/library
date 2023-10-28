import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";

export class RegisterDto extends OmitType(UserEntity, ['id', 'roles']) {
    @ApiProperty({ description: 'username must be unique' })
    username: string
    @ApiProperty({ description: 'password must 6 characters or more' })
    password: string
}

export class LoginDto extends OmitType(UserEntity, ['id', 'roles']) {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}