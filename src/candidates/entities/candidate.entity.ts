import { Admin } from "src/admin/entities/admin.entity";
import { LegislativeType } from "src/enum/legislativeType.enum";
import { Polling } from "src/polling/entities/polling.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Candidate {
    @PrimaryColumn({ type: 'uuid' })
    candidateID: string;

    // relasi ke tabel admin
    @ManyToOne(() => Admin, (admin) => admin.candidates)
    @JoinColumn({ name: 'admin' })
    admin: string;

    // relasi ke tabel polling
    @OneToMany(() => Polling, (polling) => polling.candidateID)
    polling: Polling[]

    @Column({ type: 'enum', enum: LegislativeType })
    legislativeType: LegislativeType

    @Column({ type: 'longblob' })
    photo: Buffer

    @Column({ type: 'varchar', nullable: true })
    namaKetua: string

    @Column({ type: 'varchar', nullable: true })
    namaWakil: string

    @Column({ type: 'varchar', nullable: true })
    namaCalon: string

    @Column({ type: 'varchar', nullable: true })
    nimKetua: string

    @Column({ type: 'varchar', nullable: true })
    nimWakil: string

    @Column({ type: 'varchar', nullable: true })
    nimCalon: string

    @Column({ type: 'int' })
    serialNumber: number

    @Column({ type: 'varchar', length: 1500})
    visi: string

    @Column({ type: 'varchar', length: 1500 })
    misi: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @BeforeInsert()    
    generateUUID() {
        this.candidateID = uuidV4()
    }
}
