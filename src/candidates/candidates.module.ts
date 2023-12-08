import { Module } from '@nestjs/common';
import { CandidatesService } from './service/candidates.service';
import { CandidatesController } from './controller/candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { AdminService } from 'src/admin/service/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Admin])
  ],
  controllers: [CandidatesController],
  providers: [
    CandidatesService,
    AdminService,
  ],
  exports: [CandidatesService]
})
export class CandidatesModule {}
