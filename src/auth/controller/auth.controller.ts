import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateVoterDto } from 'src/voters/dto/create-voter.dto';
import { LoginAdminDto } from '../dto/loginAdmin.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('test')
  ngetest() {
    return 'berhasil'
  }

  @Post('auth/login/admin')
  async signInAdmin(@Body() body: LoginAdminDto) {
    const result = await this.authService.signInAdmin(body);
    return result
  }

  @Post('auth/login/vote')
  async signInForVote(@Body() body: CreateVoterDto) {
    const result = await this.authService.signInForVote(body);
    return result
  }
}
