import { Module } from '@nestjs/common';
import { VotersService } from './service/voters.service';
import { VotersController } from './controller/voters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { Polling } from 'src/polling/entities/polling.entity';
import { PollingService } from 'src/polling/service/polling.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voter])
  ],
  controllers: [VotersController],
  providers: [
    VotersService
  ],
  exports: [VotersService]
})
export class VotersModule {}
