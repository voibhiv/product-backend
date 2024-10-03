import { ProductPersistencePort } from 'src/product/application/ports/out/product-persistence.adapter';
import { Product } from 'src/product/domain/product';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductMapper } from './product.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductPersistenceAdapter implements ProductPersistencePort {
  constructor(
    private productMapper: ProductMapper,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async execute(product: Product): Promise<void> {
    const productEntity: ProductEntity = this.productMapper.toEntity(product);

    await this.repository.save(productEntity);
  }
}
