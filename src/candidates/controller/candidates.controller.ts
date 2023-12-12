import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Query, Patch, Param } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchCandidateDto } from '../dto/search-candidate.dto';
import { Public } from 'src/decorators/isPublic.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { UpdateCandidateDto } from '../dto/update-candidate.dto';

@Controller('api')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get('candidate/:candidateID')
  async getOneCandidate(@Param('candidateID') candidateID: string) {
    const result = await this.candidatesService.finOneByID(candidateID)
    return result
  }

  @Roles(Role.Admin)
  @Patch('candidate/update')
  @UseInterceptors(FileInterceptor('file'))
  async updateCandidate(
    @Body() body: UpdateCandidateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const result = await this.candidatesService.updateCandidate(body, file)
    return result
  }

  @Public()
  @Get('candidate')
  async findAllCandidate(@Query() query: SearchCandidateDto) {
    const result = await this.candidatesService.findAll(query)
    return result
  }

  @Roles(Role.Admin)
  @Post('candidate/create')
  @UseInterceptors(FileInterceptor('file'))
  async createCandidate(
    @Body() body: CreateCandidateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const result = await this.candidatesService.createCandidate(body, file);
    return result
  }
}
