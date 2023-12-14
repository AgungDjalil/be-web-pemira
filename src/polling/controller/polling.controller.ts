import { Controller, Post, Body, Get, Delete, Param, Query, } from '@nestjs/common';
import { PollingService } from '../service/polling.service';
import { CreatePollingDto } from '../dto/create-polling.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { DeleteVoterDto } from 'src/voters/dto/delete-voter.dto';
import { LegislativeType } from 'src/enum/legislativeType.enum';

@Controller('api')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Get('polling/:candidateID/:type')
  async pollingCandidate(@Param('candidateID') candidateID: string, @Param('type') type: string) {
    const result = await this.pollingService.getVotesCountByCandidate(candidateID, type)
    return result
  }

  @Delete('polling/voter/:voterID/delete')
  async deletePollingAndVoter(@Param('voterID') voterID: string, @Body() body: DeleteVoterDto) {
    const result = await this.pollingService.deletePollingFromVoter(body, voterID)
    return result
  }

  @Roles(Role.Voter)
  @Post('polling/bem')
  async createPolingForBem(@Body() body: CreatePollingDto) {
    const result = await this.pollingService.createPollingForBem(body);
    return result
  }

  @Roles(Role.Voter)
  @Post('polling/dpm')
  async createPollingForDpm(@Body() body: CreatePollingDto) {
    const result = await this.pollingService.createPollingForDpm(body)
    return result
  }
}
