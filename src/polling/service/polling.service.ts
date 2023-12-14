import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePollingDto } from '../dto/create-polling.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Polling } from '../entities/polling.entity';
import { Repository } from 'typeorm';
import { VotersService } from 'src/voters/service/voters.service';
import { LegislativeType } from 'src/enum/legislativeType.enum';
import { DeleteVoterDto } from 'src/voters/dto/delete-voter.dto';

@Injectable()
export class PollingService {
  constructor(
    @InjectRepository(Polling) private pollingRepository: Repository<Polling>,
    private voterService: VotersService
  ) {}

  async getVotesCountByCandidate(candidateID: string, type: string) {
    const voteCount = await this.pollingRepository.countBy({
      candidateID
    })

    const totalCount = await this.pollingRepository.countBy({
      legislativeType: type === 'bem' ? LegislativeType.Bem : LegislativeType.Dpm
    })

    const percentage = (voteCount / totalCount) * 100

    return {
      percentage: percentage,
      count: voteCount,
      totalSuara: totalCount
    }
  }

  async deletePollingFromVoter(body: DeleteVoterDto, voterID: string) {
    try {
      const polling = await this.pollingRepository.find({
        where: {
          voterID: voterID
        }
      })

      
      await this.pollingRepository.remove(polling)

      await this.voterService.deleteVoter(body, voterID)

      return true
    } catch (err) {
      throw err
    }
  }

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

