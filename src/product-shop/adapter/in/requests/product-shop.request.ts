import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export class SaveProductShopRequest {
  @Type(() => Number)
  @IsInt()
  idShop: number;

  @Type(() => Number)
  @IsNumber()
  shopPrice: number;
}
