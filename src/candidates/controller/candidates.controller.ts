import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Query } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchCandidateDto } from '../dto/search-candidate.dto';
import { Public } from 'src/decorators/isPublic.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('api')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

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
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const result = await this.candidatesService.createCandidate(createCandidateDto, file);
    return result
  }
}
