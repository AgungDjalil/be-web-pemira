import { Controller, Post, Body, Get, } from '@nestjs/common';
import { PollingService } from '../service/polling.service';
import { CreatePollingDto } from '../dto/create-polling.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('api')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

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
