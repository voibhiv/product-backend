import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SaveProductShopRequest } from 'src/product-shop/adapter/in/requests/product-shop.request';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';

export class SaveProductRequest {
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly cost: number;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveProductShopRequest)
  readonly shops: SaveProductShopRequest[];

  toCommand(): SaveProductCommand {
    return new SaveProductCommand(
      this.description,
      this.shops,
      this.cost,
      this.image,
    );
  }
}
