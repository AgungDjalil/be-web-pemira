import { Module } from '@nestjs/common';
import { PollingService } from './service/polling.service';
import { PollingController } from './controller/polling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polling } from './entities/polling.entity';
import { VotersService } from 'src/voters/service/voters.service';
import { Voter } from 'src/voters/entities/voter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Polling, Voter])
  ],
  controllers: [PollingController],
  providers: [
    PollingService,
    VotersService,
  ],
  exports: [PollingService]
})
export class PollingModule {}
