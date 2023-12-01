import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

  async findAdmin(nim: string) {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          nim: nim
        }
      })

      return admin
      
    } catch (err) {
      return err.message
    }
  }

  async create(body: CreateAdminDto) {
    try {
      const hasPassword = await bcrypt.hash(body.password, 10)

      const admin = this.adminRepository.create({
        nim: body.nim,
        fullName: body.fullName,
        password: hasPassword
      })

      await this.adminRepository.save(admin);

      return admin

    } catch (err) {
      if(err.errno === 1062)
        throw new ConflictException('nim already exists')
    }
  }
}
