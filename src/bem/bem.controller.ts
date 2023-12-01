import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BemService } from './bem.service';
import { CreateBemDto } from './dto/create-bem.dto';
import { UpdateBemDto } from './dto/update-bem.dto';

@Controller('bem')
export class BemController {
  constructor(private readonly bemService: BemService) {}

  @Post()
  create(@Body() createBemDto: CreateBemDto) {
    return this.bemService.create(createBemDto);
  }

  @Get()
  findAll() {
    return this.bemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBemDto: UpdateBemDto) {
    return this.bemService.update(+id, updateBemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bemService.remove(+id);
  }
}
