import { Injectable } from '@nestjs/common';
import { SaveProductCommand } from '../ports/in/save-product.command';
import { Product } from 'src/product/domain/product';
import { ProductPersistencePort } from '../ports/out/product-persistence.adapter';
import { ProductUseCase } from '../ports/in/product.use-case';
import { GenericFilter } from 'src/core/generics/generic-filter';
import { ProductListPort } from '../ports/out/product-list.adapter';
import { ListProductRequest } from 'src/product/adapter/in/requests/list-product.request';

@Injectable()
export class ProductService implements ProductUseCase {
  constructor(private productPersistencePort: ProductPersistencePort,
    private productListPort: ProductListPort
  ) {}

  async saveProduct(command: SaveProductCommand): Promise<Product> {
    const product: Product = {
      image: command.image,
      shops: command.shops,
      cost: command.cost,
      description: command.description,
    };

    return this.productPersistencePort.execute(product);
  }

  async list(filter: GenericFilter & ListProductRequest): Promise<Product[]> {
    return this.productListPort.execute(filter);
  }

}
