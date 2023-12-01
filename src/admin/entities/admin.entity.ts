import { Role } from "src/enum/role.enum";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryColumn({ type: 'uuid' })
    adminID: string

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
}
