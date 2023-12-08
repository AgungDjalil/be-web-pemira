import { Candidate } from "src/candidates/entities/candidate.entity";
import { LegislativeType } from "src/enum/legislativeType.enum";
import { Voter } from "src/voters/entities/voter.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
export class Polling {
    @PrimaryColumn({ type: 'uuid' })
    pollingID: string;

    // relasi ke tabel candidate
    @ManyToOne(() => Candidate, (candidate) => candidate.polling)
    candidates: Candidate;

    // relasi ke tabel voter
    @ManyToOne(() => Voter, (voter) => voter.polling)
    voters: Voter;

    @Column({ type: 'enum', enum: LegislativeType})
    legislativeType: LegislativeType

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @BeforeInsert()
    genereateUUID() {
        this.pollingID = uuidV4()
    }
}
