import { Type } from "class-transformer";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./pageMetaDto.dto";

export class PageDto<T> {
    constructor(data: T[], meta: PageMetaDto) {
        this.data = data
        this.meta = meta
    }

    @IsArray()
    data: T[]

    @Type(() => PageMetaDto)
    meta: PageMetaDto
}