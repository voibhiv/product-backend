import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductMapper } from './product.mapper';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { GenericFilter } from 'src/core/generics/generic-filter';
import { PaginateService } from 'src/core/generics/paginate.service';
import { Product } from 'src/product/domain/product';
import { ListProductRequest } from '../in/requests/list-product.request';
import { ProductListPort } from 'src/product/application/ports/out/product-list.port';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductListAdapter
  extends PaginateService
  implements ProductListPort
{
  constructor(
    private productMapper: ProductMapper,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {
    super();
  }

  async execute(
    filter: GenericFilter & ListProductRequest,
  ): Promise<{ products: Product[]; count: number }> {
    const { ...params } = filter;
    const relations = ['product_shop', 'product_shop.shop'];
    const productListPaginated = await this.paginate(
      this.repository,
      filter,
      this.createWhereQuery(params),
      relations,
    );

    const [productList, count] = productListPaginated;

    return {
      products: productList.map((product) => {
        return this.productMapper.toResponse(product);
      }),
      count,
    };
  }

  createWhereQuery(
    params: ListProductRequest,
  ): FindOptionsWhere<ProductEntity> {
    const where: FindOptionsWhere<ProductEntity> = {};

    // Check by code/id
    if (params.id) {
      where.id = params.id;
    }

    // Check description
    if (params.description) {
      where.description = ILike(`%${params.description}%`);
    }

    // Check by cost of product
    if (params.cost) {
      where.cost = params.cost;
    }

    // Check 'precoVenda'
    if (params.salePrice) {
      where.product_shop = {
        sale_price: params.salePrice,
      };
    }

    return where;
  }
}
