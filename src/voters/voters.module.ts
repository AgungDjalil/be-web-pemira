import { Module } from '@nestjs/common';
import { VotersService } from './service/voters.service';
import { VotersController } from './controller/voters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voter]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [VotersController],
  providers: [VotersService],
})
export class VotersModule {}
