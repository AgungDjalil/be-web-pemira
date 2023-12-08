import { Role } from "src/enum/role.enum";
import { Polling } from "src/polling/entities/polling.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Voter {
    @PrimaryColumn({ type: 'uuid'})
    voterID: string

    // relasi ke tabel polling
    @ManyToOne(() => Polling, (polling) => polling.voters)
    polling: Polling

    @Column({ type: 'varchar', length: 10, unique: true})
    nim: string

    @Column({ type: 'varchar' })
    fullName: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    joinAt: Date

    @Column({ type: 'enum', enum: Role, default: Role.Voter })
    role: Role

    @BeforeInsert()
    generateUUID() {
        this.voterID = uuidV4()
    }
}
