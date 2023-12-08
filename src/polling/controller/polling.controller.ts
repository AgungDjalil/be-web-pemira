import { Controller, Post, Body, } from '@nestjs/common';
import { PollingService } from '../service/polling.service';
import { CreatePollingDto } from '../dto/create-polling.dto';
import { UpdatePollingDto } from '../dto/update-polling.dto';

@Controller('api')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Post('polling/bem')
  async createPolingForBem(@Body() body: CreatePollingDto) {
    const result = await this.pollingService.createPollingForBem(body);
    return result
  }

  @Post('polling/dpm')
  async createPollingForDpm(@Body() body: CreatePollingDto) {
    const result = await this.createPollingForDpm(body)
    return result
  }
}
