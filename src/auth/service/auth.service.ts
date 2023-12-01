import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { VotersService } from 'src/voters/service/voters.service';
import { AdminService } from 'src/admin/service/admin.service';
import { JwtService } from '@nestjs/jwt';
import { CreateVoterDto } from 'src/voters/dto/create-voter.dto';
import { LoginAdminDto } from '../dto/loginAdmin.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private voterService: VotersService,
    private adminService: AdminService
  ) {}

  async signInAdmin(body: LoginAdminDto) {
    try {
      const admin = await this.adminService.findAdmin(body.nim)

      if(!admin)
        throw new NotFoundException('admin not found')

      const isMatch = await bcrypt.compare(body.password, admin.password)

      if(!isMatch)
        throw new UnprocessableEntityException('password mismatch')

      const payload = {
        sub: admin.adminID,
        role: admin.role
      }

      return {
        accessToken: await this.jwtService.signAsync(payload)
      }

    } catch (err) {
      return err.message
    }
  }

  async signInForVote(body: CreateVoterDto) {
    try {
      const voter = await this.voterService.create(body)

      if(voter === 1062)
        throw new ConflictException('nim already used')
      
      const payload = {
        sub: voter.voterID,
        role: voter.role
      }

      return {
        accessToken: await this.jwtService.signAsync(payload)
      }
      
    } catch (err) {
      return err
    }
  }
}
