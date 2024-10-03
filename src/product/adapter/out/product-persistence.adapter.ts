import { ProductPersistencePort } from 'src/product/application/ports/out/product-persistence.adapter';
import { Product } from 'src/product/domain/product';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductMapper } from './product.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCostException } from 'src/core/exceptions/product/product-cost.exception';

@Injectable()
export class ProductPersistenceAdapter implements ProductPersistencePort {
  constructor(
    private productMapper: ProductMapper,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async execute(product: Product): Promise<void> {
    const productEntity: ProductEntity = this.productMapper.toEntity(product);

    try {
      if (product.cost) {
        const costAsString = product.cost.toString();
        const isValidFormat = /^\d{1,10}(\.\d{1,3})?$/.test(costAsString);

        if (!isValidFormat) throw new ProductCostException();
      }

      await this.repository.save(productEntity);
    } catch (error) {
      throw error;
    }
  }
}
