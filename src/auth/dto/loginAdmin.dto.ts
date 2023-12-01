import { IsString } from "class-validator";

export class LoginAdminDto {
    @IsString()
    nim: string;

    @IsString()
    password: string;
}