import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateVoterDto } from 'src/voters/dto/create-voter.dto';
import { LoginAdminDto } from '../dto/loginAdmin.dto';
import { Public } from 'src/decorators/isPublic.decorator';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Roles(Role.Admin)
  @Get('test')
  ngetest() {
    return 'berhasil'
  }

  @Public()
  @Post('auth/login/admin')
  async signInAdmin(@Body() body: LoginAdminDto) {
    const result = await this.authService.signInAdmin(body);
    return result
  }

  @Public()
  @Post('auth/login/voter')
  async signInForVote(@Body() body: CreateVoterDto) {
    const result = await this.authService.signInForVote(body);
    return result
  }
}
