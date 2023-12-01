import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Controller('api')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('admin/create')
  async create(@Body() body: CreateAdminDto) {
    const result = await this.adminService.create(body)
    return result
  }
}
