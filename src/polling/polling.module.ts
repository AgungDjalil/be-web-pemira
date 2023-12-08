import { Module } from '@nestjs/common';
import { PollingService } from './service/polling.service';
import { PollingController } from './controller/polling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polling } from './entities/polling.entity';
import { CandidatesService } from 'src/candidates/service/candidates.service';
import { VotersService } from 'src/voters/service/voters.service';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Voter } from 'src/voters/entities/voter.entity';
import { AdminService } from 'src/admin/service/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Polling, Candidate, Voter, Admin])
  ],
  controllers: [PollingController],
  providers: [
    PollingService,
    AdminService,
    CandidatesService,
    VotersService
  ],
})
export class PollingModule {}
