import { Controller, Post, Body, Query, Get, Param, Delete } from '@nestjs/common';
import { VotersService } from '../service/voters.service';
import { CreateVoterDto } from '../dto/create-voter.dto';
import { UpdateVoterDto } from '../dto/update-voter.dto';
import { PageOptionsDto } from '../dto/pageOptions.dto';
import { PageDto } from 'src/dtos/page.dto';
import { VoterDto } from '../dto/voter.dto';
import { VerifieVoterDto } from '../dto/verified-voter.dto';
import { DeleteVoterDto } from '../dto/delete-voter.dto';

@Controller('api')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  // @Delete('voter/delete/:voterID')
  // async deleteVoter(@Param('voterID') voterID: string, @Body() body: DeleteVoterDto) {
  //   console.log(voterID)
  //   const result = await this.votersService.deleteVoter(body, voterID)
  //   return result
  // }

  @Post('voter/:voterID')
  async getOneVoter(@Param('voterID') voterID: string, @Body() body: VerifieVoterDto) {
    const result = await this.votersService.verifiedVoters(body, voterID)
    return result
  }

  @Get('voters')
  async getVoter(@Query() query: PageOptionsDto): Promise<PageDto<VoterDto>> {
    const result = await this.votersService.findAllVoters(query)
    return result
  }
}
