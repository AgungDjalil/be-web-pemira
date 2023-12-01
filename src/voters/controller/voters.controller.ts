import { Controller, Post, Body } from '@nestjs/common';
import { VotersService } from '../service/voters.service';
import { CreateVoterDto } from '../dto/create-voter.dto';
import { UpdateVoterDto } from '../dto/update-voter.dto';

@Controller('api')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  @Post('voters/create')
  async create(@Body() body: CreateVoterDto) {
    const result = await this.votersService.create(body);
    return result
  }
}
