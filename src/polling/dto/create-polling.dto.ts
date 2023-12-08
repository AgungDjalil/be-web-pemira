import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreatePollingDto {
    @IsString()
    candidate: string

    @IsString()
    voter: string

    @Type(() => Number)
    @IsNumber()
    serialNumber: number   
}
