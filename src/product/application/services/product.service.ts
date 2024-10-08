import { Injectable } from '@nestjs/common';
import { SaveProductCommand } from '../ports/in/save-product.command';
import { Product } from 'src/product/domain/product';
import { ProductPersistencePort } from '../ports/out/product-persistence.port';
import { ProductUseCase } from '../ports/in/product.use-case';
import { GenericFilter } from 'src/core/generics/generic-filter';
import { ProductListPort } from '../ports/out/product-list.port';
import { ListProductRequest } from 'src/product/adapter/in/requests/list-product.request';
import { ProductRemovePort } from '../ports/out/product-remove.port';
import { ProductUpdatePort } from '../ports/out/product-update.port';

@Injectable()
export class ProductService implements ProductUseCase {
  constructor(
    private productPersistencePort: ProductPersistencePort,
    private productListPort: ProductListPort,
    private productRemovePort: ProductRemovePort,
    private productUpdatePort: ProductUpdatePort,
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

  async list(
    filter: GenericFilter & ListProductRequest,
  ): Promise<{ products: Product[]; count: number }> {
    return this.productListPort.execute(filter);
  }

  async delete(id: number): Promise<boolean> {
    return this.productRemovePort.execute(id);
  }

  async updateProduct(
    command: SaveProductCommand,
    id: number,
  ): Promise<Product> {
    return this.productUpdatePort.execute(command, id);
  }
}
