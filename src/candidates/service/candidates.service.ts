import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from '../entities/candidate.entity';
import { Repository, UsingJoinColumnIsNotAllowedError } from 'typeorm';
import { LegislativeType } from 'src/enum/legislativeType.enum';
import { AdminService } from 'src/admin/service/admin.service';
import { Multer } from 'multer';
import { SearchCandidateDto } from '../dto/search-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate) private candidateRepository: Repository<Candidate>,
    private adminService: AdminService
  ) {}

  async findAll(query: SearchCandidateDto) {
    try {
      const candidates = await this.candidateRepository.find({
        where: {
          legislativeType: query.legislativeType
        }
      })

      return candidates

    } catch (err) {
      console.log(err)
    }
  }

  async createCandidate(body: CreateCandidateDto, file: Express.Multer.File) {
    try {
      const admin = await this.adminService.findOneByNim(body.nimAdmin)

      if(!admin) throw new BadRequestException('only admin can create candidate')

      const candidate = this.candidateRepository.create({
        legislativeType: body.legislativeType,
        visi: body.visi,
        misi: body.misi,
        photo: file.buffer,
        admin: admin.adminID,
        serialNumber: body.serialNumber,
        namaWakil: body.namaWakil,
        namaKetua: body.namaKetua,
        namaCalon: body.namaCalon,
        nimCalon: body.nimCalon,
        nimKetua: body.nimKetua,
        nimWakil: body.nimWakil,
      })

      await this.candidateRepository.save(candidate)

      return candidate;

    } catch (err) {
      throw err
    }
  }

  async findOneByIdDpm(id: string, serialNumber: number) {
    try {
      const candidate = await this.candidateRepository.findOne({
        where: {
          candidateID: id,
          serialNumber: serialNumber,
          legislativeType: LegislativeType.Dpm
        }
      })

      return candidate

    } catch (err) {
      return err.message
    }
  }

  async findOneByIdBem(id: string, serialNumber: number) {
    try {
      const candidate = this.candidateRepository.findOne({
        where: {
          candidateID : id,
          serialNumber: serialNumber,
          legislativeType: LegislativeType.Bem
        }
      })

      return candidate;

    } catch (err) {
      return err.message
    }
  }
}
