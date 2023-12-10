import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('api')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.Admin)
  @Post('admin/create')
  async create(@Body() body: CreateAdminDto) {
    const result = await this.adminService.create(body)
    return result
  }
}
