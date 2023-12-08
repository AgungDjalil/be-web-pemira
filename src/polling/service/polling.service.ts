import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollingDto } from '../dto/create-polling.dto';
import { UpdatePollingDto } from '../dto/update-polling.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Polling } from '../entities/polling.entity';
import { Repository } from 'typeorm';
import { CandidatesService } from 'src/candidates/service/candidates.service';
import { VotersService } from 'src/voters/service/voters.service';
import { LegislativeType } from 'src/enum/legislativeType.enum';

@Injectable()
export class PollingService {
  constructor(
    @InjectRepository(Polling) private pollingRepository: Repository<Polling>,
    private candidateService: CandidatesService,
    private voterService: VotersService
  ) {}

  async createPollingForDpm(body: CreatePollingDto) {
    try {
      const candidate = await this.candidateService.findOneByIdDpm(body.candidate, body.serialNumber)
      const voter = await this.voterService.findOneByNim(body.voter)

      if(!candidate && !voter)
        throw new NotFoundException('candidate or voter not found')

      const polling = this.pollingRepository.create({
        legislativeType: LegislativeType.Dpm,
        candidates: candidate,
        voters: voter
      })

      await this.pollingRepository.save(polling)

      return polling

    } catch (err) {
      return err.message
    }
  }

  async createPollingForBem(body: CreatePollingDto) {
    try {
      const candidate = await this.candidateService.findOneByIdBem(body.candidate, body.serialNumber)
      const voter = await this.voterService.findOneByNim(body.voter)

      if(!candidate && !voter)
        throw new NotFoundException('candidate or voter cannot be found')

      const polling = this.pollingRepository.create({
        legislativeType: LegislativeType.Bem,
        candidates: candidate,
        voters: voter
      })
      
      await this.pollingRepository.save(polling)

      return polling;

    } catch (err) {
      return err.message
    }
  }
}

