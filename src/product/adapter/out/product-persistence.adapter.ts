import { ProductPersistencePort } from 'src/product/application/ports/out/product-persistence.adapter';
import { Product } from 'src/product/domain/product';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductMapper } from './product.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCostException } from 'src/core/exceptions/product/product-cost.exception';
import { ProductDescriptionException } from 'src/core/exceptions/product/product-description.exception';

@Injectable()
export class ProductPersistenceAdapter implements ProductPersistencePort {
  constructor(
    private productMapper: ProductMapper,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async execute(product: Product): Promise<Product> {
    const productEntity: ProductEntity = this.productMapper.toEntity(product);

    try {
      const hasProductWithSameDescription = await this.validateName(
        productEntity.description,
      );

      if (hasProductWithSameDescription) {
        throw new ProductDescriptionException();
      }

      // Check if cost has the correct format
      if (product.cost) {
        const costAsString = product.cost.toString();
        const isValidFormat = /^\d{1,10}(\.\d{1,3})?$/.test(costAsString);

        if (!isValidFormat) throw new ProductCostException();
      }

      const productSaved = await this.repository.save(productEntity);

      const productToReturn = await this.repository.findOne({
        where: { id: productSaved.id },
        relations: ['product_shop', 'product_shop.shop'],
      });

      return this.productMapper.toResponse(productToReturn);
    } catch (error) {
      throw error;
    }
  }

  async validateName(descriptionName: string): Promise<boolean> {
    const validateByDescription = await this.repository.findOne({
      where: {
        description: descriptionName,
      },
    });

    return Boolean(validateByDescription);
  }
}
