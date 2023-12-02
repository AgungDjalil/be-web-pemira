import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/admin/entities/admin.entity";
import { Candidate } from "src/candidates/entities/candidate.entity";
import { Voter } from "src/voters/entities/voter.entity";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [
                Admin,
                Voter,
                Candidate
            ],
            // PENTING!!!! NYALAKAN SYNCHRONIZE HANYA DI PROSES DEVELOPMENT
            synchronize: true,
        }),
    ]
})
export class DatabaseModule {}