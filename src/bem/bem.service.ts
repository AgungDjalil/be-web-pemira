import { Injectable } from '@nestjs/common';
import { CreateBemDto } from './dto/create-bem.dto';
import { UpdateBemDto } from './dto/update-bem.dto';

@Injectable()
export class BemService {
  create(createBemDto: CreateBemDto) {
    return 'This action adds a new bem';
  }

  findAll() {
    return `This action returns all bem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bem`;
  }

  update(id: number, updateBemDto: UpdateBemDto) {
    return `This action updates a #${id} bem`;
  }

  remove(id: number) {
    return `This action removes a #${id} bem`;
  }
}
