import { IsBoolean, IsNumber } from "class-validator"
import { PageMetaDtoParameters } from "src/interface/pageMetaParams.interface"

export class PageMetaDto {
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page
        this.take = pageOptionsDto.take
        this.itemCount = itemCount
        this.pageCount = Math.ceil(this.itemCount / this.take)
        this.hasPreviousPage = this.page > 1
        this.hasNextPage = this.page < this.pageCount
    }

    @IsNumber()
    page: number 

    @IsNumber()
    take: number

    @IsNumber()
    itemCount: number 

    @IsNumber()
    pageCount: number

    @IsBoolean()
    hasPreviousPage: boolean

    @IsBoolean()
    hasNextPage: boolean
}