import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsNumber, IsString } from "class-validator";
import { LegislativeType } from "src/enum/legislativeType.enum";

export class CreateCandidateDto {
    @IsString()
    nimAdmin: string

    @IsEnum(LegislativeType)
    legislativeType: LegislativeType

    @Type(() => Number)
    @IsNumber()
    serialNumber: number

    @IsString()
    visi: string

    @IsString()
    misi: string
}
