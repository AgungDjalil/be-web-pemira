import { ConflictException, Injectable } from '@nestjs/common';
import { CreateVoterDto } from '../dto/create-voter.dto';
import { UpdateVoterDto } from '../dto/update-voter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from '../entities/voter.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(Voter) private voterRepository: Repository<Voter>,
    private jwtService: JwtService
  ) {}

  async create(body: CreateVoterDto) {
    try {
      const voter = this.voterRepository.create({
        nim: body.nim,
        fullName: body.fullName,
      })

      await this.voterRepository.save(voter)

      const payload = {
        sub: voter.voterID,
        fullName: voter.fullName,
        role: voter.role
      }

      return {
        accessToken: await this.jwtService.signAsync(payload)
      };

    } catch (err) {
      if(err.errno === 1062)
        throw new ConflictException('nim already used')
    }
  }
}
