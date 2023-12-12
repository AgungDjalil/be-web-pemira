import { PartialType } from "@nestjs/mapped-types";
import { CreateCandidateDto } from "./create-candidate.dto";
import { IsString } from "class-validator";

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
    @IsString()
    candidateID: string   
}