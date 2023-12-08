import { ConflictException, Injectable } from '@nestjs/common';
import { CreateVoterDto } from '../dto/create-voter.dto';
import { UpdateVoterDto } from '../dto/update-voter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from '../entities/voter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(Voter) private voterRepository: Repository<Voter>
  ) {}

  async findOneByNim(nim: string) {
    try {
      const voter = await this.voterRepository.findOne({
        where : {
          nim : nim
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
