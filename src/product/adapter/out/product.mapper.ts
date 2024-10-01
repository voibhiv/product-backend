import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/domain/product';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductMapper {
  toEntity(product: Product): ProductEntity {
    return new ProductEntity(product.description, product.cost);
  }
}
