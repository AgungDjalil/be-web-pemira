import { IsString } from "class-validator";

export class CreateVoterDto {
    @IsString()
    fullName: string;

    @IsString()
    nim: string;
}
