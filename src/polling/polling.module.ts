import { Module } from '@nestjs/common';
import { PollingService } from './service/polling.service';
import { PollingController } from './controller/polling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polling } from './entities/polling.entity';
import { VotersService } from 'src/voters/service/voters.service';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Voter } from 'src/voters/entities/voter.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Polling, Voter, Admin, Candidate])
  ],
  controllers: [PollingController],
  providers: [
    PollingService,
    VotersService
  ],
})
export class PollingModule {}
