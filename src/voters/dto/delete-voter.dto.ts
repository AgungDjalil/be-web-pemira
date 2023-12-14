import { PartialType } from "@nestjs/mapped-types";
import { VerifieVoterDto } from "./verified-voter.dto";

export class DeleteVoterDto extends PartialType(VerifieVoterDto) {}