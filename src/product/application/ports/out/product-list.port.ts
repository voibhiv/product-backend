import { GenericFilter } from 'src/core/generics/generic-filter';
import { ListProductRequest } from 'src/product/adapter/in/requests/list-product.request';
import { ProductEntity } from 'src/product/adapter/out/product.entity';
import { Product } from 'src/product/domain/product';
import { FindOptionsWhere } from 'typeorm';

export abstract class ProductListPort {
  abstract execute(
    filter: GenericFilter & ListProductRequest,
  ): Promise<{ products: Product[]; count: number }>;
  abstract createWhereQuery(
    params: ListProductRequest,
  ): FindOptionsWhere<ProductEntity>;
}
