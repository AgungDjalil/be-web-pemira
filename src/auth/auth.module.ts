import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { VotersService } from 'src/voters/service/voters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voter } from 'src/voters/entities/voter.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminService } from 'src/admin/service/admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voter, Admin]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    VotersService,
    AdminService
  ],
})
export class AuthModule {}
