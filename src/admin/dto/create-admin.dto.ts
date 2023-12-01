import { IsString } from "class-validator"

export class CreateAdminDto {
    @IsString()
    nim: string

    @IsString()
    fullName: string

    @IsString()
    password: string
}
