import { IsString } from "class-validator";

export class CreatePollingDto {
    @IsString()
    candidateID: string

    @IsString()
    voterNim: string
}
