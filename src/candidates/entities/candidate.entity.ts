import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Candidate {
    @PrimaryColumn({ type: 'uuid' })
    candidateID: string;

    @Column({ type: 'blob' })
    photo: Buffer

    @Column({ type: 'varchar', length: 10, unique: true })
    nim: string

    @Column({ type: 'varchar' })
    fullName: string

    @Column({ type: 'int' })
    serialNumber: number

    @Column({ type: 'varchar', length: 500})
    visi: string

    @Column({ type: 'varchar', length: 500 })
    misi: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date
}
