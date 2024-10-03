import { Injectable } from '@nestjs/common';
import { SaveProductCommand } from '../ports/in/save-product.command';
import { Product } from 'src/product/domain/product';
import { ProductPersistencePort } from '../ports/out/product-persistence.adapter';
import { ProductUseCase } from '../ports/in/product.use-case';

@Injectable()
export class ProductService implements ProductUseCase {
  constructor(private productPersistencePort: ProductPersistencePort) {}

  async saveProduct(command: SaveProductCommand): Promise<Product> {
    const product: Product = {
      image: command.image,
      shops: command.shops,
      cost: command.cost,
      description: command.description,
    };

    return this.productPersistencePort.execute(product);
  }
}
