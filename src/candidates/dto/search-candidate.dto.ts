import { IsEnum } from "class-validator";
import { LegislativeType } from "src/enum/legislativeType.enum";

export class SearchCandidateDto {
    @IsEnum(LegislativeType)
    legislativeType: LegislativeType
}