import { Controller, Post, Body, UploadedFile, UseInterceptors, Get } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get('candidate')
  async findAllCandidate() {
    const result = await this.candidatesService.findAll()
    return result
  }

  @Post('candidate/create')
  @UseInterceptors(FileInterceptor('file'))
  async createCandidate(
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const result = await this.candidatesService.createCandidate(createCandidateDto, file);
    return result
  }
}
