import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
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
  description: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  cost: number;

  @IsOptional()
  image: Buffer;

  @IsArray({
    message:
      'Um ou mais campos obrigatórios não foram preenchidos corretamente.',
  })
  @ArrayNotEmpty({
    message:
      'Um ou mais campos obrigatórios não foram preenchidos corretamente.',
  })
  @ValidateNested({
    each: true,
    message:
      'Existe uma inconsistência nos dados de entrada, por favor tente novamente!.',
  })
  @Type(() => SaveProductShopRequest)
  shops: SaveProductShopRequest[];

  toCommand(): SaveProductCommand {
    return new SaveProductCommand(
      this.description,
      this.shops,
      this.cost,
      this.image,
    );
  }
}
