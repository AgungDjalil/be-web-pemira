import { ConflictException, Injectable } from '@nestjs/common';
import { CreateVoterDto } from '../dto/create-voter.dto';
import { UpdateVoterDto } from '../dto/update-voter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from '../entities/voter.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '../dto/pageOptions.dto';
import { PageMetaDto } from 'src/dtos/pageMetaDto.dto';
import { PageDto } from 'src/dtos/page.dto';
import { VoterDto } from '../dto/voter.dto';
import { VerifieVoterDto } from '../dto/verified-voter.dto';
import { DeleteVoterDto } from '../dto/delete-voter.dto';
import { PollingService } from 'src/polling/service/polling.service';

@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(Voter) private voterRepository: Repository<Voter>
  ) { }

  async deleteVoter(body: DeleteVoterDto, voterID: string) {
    try {
      const voter = await this.voterRepository.findOne({
        where: {
          voterID: voterID,
          nim: body.nim,
        }
      })

      await this.voterRepository.remove(voter)

      return true

    } catch (err) {
      throw err
    }
  }

  async verifiedVoters(body: VerifieVoterDto, voterID: string) {
    const voter = await this.voterRepository.findOne({
      where: {
        voterID: voterID,
        nim: body.nim
      }
    })

    voter.isVerified = true

    await this.voterRepository.save(voter)

    return voter
  }

  async findAllVoters(pageOptionsDto: PageOptionsDto): Promise<PageDto<VoterDto>> {
    const queryBuilder = this.voterRepository.createQueryBuilder("voter")

    queryBuilder
      .orderBy("voter.joinAt")
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .where("voter.isVerified = :isVerified", { isVerified: false })

    if (pageOptionsDto.search) {
      queryBuilder.andWhere("voter.nim = :nim", { nim: pageOptionsDto.search });
    }

    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities()

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto)
  }

  async findOneByNim(nim: string) {
    try {
      const voter = await this.voterRepository.findOne({
        where: {
          nim: nim
        }
      })

      return voter

    } catch (err) {
      return err.message
    }
  }

  async create(body: CreateVoterDto) {
    try {
      const voter = this.voterRepository.create({
        nim: body.nim,
        fullName: body.fullName,
      })

      await this.voterRepository.save(voter)

      return voter

    } catch (err) {
      return err.errno
    }
  }
}
