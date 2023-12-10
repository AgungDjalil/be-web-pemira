import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
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

    @IsString()
    @IsOptional()
    namaKetua: string = ''

    @IsString()
    @IsOptional()
    namaWakil: string = ''

    @IsString()
    @IsOptional()
    nimKetua: string = ''

    @IsString()
    @IsOptional()
    nimWakil: string = ''

    @IsString()
    @IsOptional()
    namaCalon: string = ''

    @IsString()
    @IsOptional()
    nimCalon: string = ''
}
