import { Candidate } from "src/candidates/entities/candidate.entity";
import { Role } from "src/enum/role.enum";
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Admin {
    @PrimaryColumn({ type: 'uuid' })
    adminID: string

    // relasi ke tabel candidate
    @OneToMany(() => Candidate, (candidate) => candidate.admin)
    candidates: Candidate[]

    @Column({ type: 'varchar', unique: true})
    nim: string

    @Column({ type: 'varchar' })
    fullName: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createAt: string;

    @Column({ type: 'enum', enum: Role, default: Role.Admin })
    role: Role

    @BeforeInsert()
    generateUUID() {
        this.adminID = uuidV4()
    }
}
