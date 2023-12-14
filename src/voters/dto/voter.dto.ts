import { IsDate, IsString } from "class-validator";

export class VoterDto {
    @IsString()
    nim: string

    @IsString()
    fullName: string

    @IsDate()
    joinAt: Date
}