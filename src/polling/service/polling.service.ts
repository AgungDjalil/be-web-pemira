import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollingDto } from '../dto/create-polling.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Polling } from '../entities/polling.entity';
import { Repository } from 'typeorm';
import { VotersService } from 'src/voters/service/voters.service';
import { LegislativeType } from 'src/enum/legislativeType.enum';

@Injectable()
export class PollingService {
  constructor(
    @InjectRepository(Polling) private pollingRepository: Repository<Polling>,
    private voterService: VotersService
  ) {}

  async createPollingForBem(body: CreatePollingDto) {
    try {
      const voter = await this.voterService.findOneByNim(body.voterNim)

      const existionPollingCount = await this.pollingRepository.count({
        where: {
          voterID: voter.voterID
        }
      })

      if(existionPollingCount === 2) throw new BadRequestException('the number of polls cannot be more than 2')
  
      const polling = this.pollingRepository.create({
        legislativeType: LegislativeType.Bem,
        voterID: voter.voterID,
        candidateID: body.candidateID
      })
      
      await this.pollingRepository.save(polling)
  
      return true;
  
    } catch (err) {
      throw err
    }
  }

  async createPollingForDpm(body: CreatePollingDto) {
    try {
      const voter = await this.voterService.findOneByNim(body.voterNim)

      const existionPollingCount = await this.pollingRepository.count({
        where: {
          voterID: voter.voterID
        }
      })
      
      if(existionPollingCount === 2) throw new BadRequestException('the number of polls cannot be more than 2')

      const polling = this.pollingRepository.create({
        legislativeType: LegislativeType.Dpm,
        voterID: voter.voterID,
        candidateID: body.candidateID
      })

      await this.pollingRepository.save(polling)

      return polling

    } catch (err) {
      throw err
    }
  }

}

