import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "src/enum/order.enum";

export class PageOptionsDto {
    @IsEnum(Order)
    @IsOptional()
    order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    take?: number = 10;

    @IsOptional()
    @IsString()
    search?: string = null

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
