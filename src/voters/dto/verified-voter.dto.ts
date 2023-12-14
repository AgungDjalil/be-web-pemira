import { IsString } from "class-validator";

export class VerifieVoterDto {
    @IsString()
    nim: string
}