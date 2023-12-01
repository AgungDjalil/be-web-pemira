import { Module } from '@nestjs/common';
import { BemService } from './bem.service';
import { BemController } from './bem.controller';

@Module({
  controllers: [BemController],
  providers: [BemService],
})
export class BemModule {}
