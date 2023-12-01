import { PartialType } from '@nestjs/mapped-types';
import { CreateBemDto } from './create-bem.dto';

export class UpdateBemDto extends PartialType(CreateBemDto) {}
