import { Product } from 'src/product/domain/product';
import { SaveProductCommand } from '../in/save-product.command';
import { ProductShopEntity } from 'src/product-shop/adapter/out/product-shop.entity';
import { DeleteResult } from 'typeorm';

export abstract class ProductUpdatePort {
  abstract execute(command: SaveProductCommand, id: number): Promise<Product>;
  abstract getShopsIdsToRemove(
    allIdsSended: number[],
    id: number,
  ): Promise<ProductShopEntity[]>;
  abstract deleteRelations(ids: number[]): Promise<DeleteResult>;
  abstract validateName(description: string, id: number): Promise<boolean>;
}
