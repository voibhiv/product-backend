import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export class SaveProductShopRequest {
  @Type(() => Number)
  @IsInt()
  idShop: number;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  shopPrice: number;
}
