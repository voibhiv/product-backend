import { Injectable } from '@nestjs/common';
import { SaveProductUseCase } from '../ports/in/save-product.use-case';
import { SaveProductCommand } from '../ports/in/save-product.command';
import { Product } from 'src/product/domain/product';
import { ProductPersistencePort } from '../ports/out/product-persistence.adapter';

@Injectable()
export class SaveProductService implements SaveProductUseCase {
  constructor(private productPersistencePort: ProductPersistencePort) {}

  async saveProduct(command: SaveProductCommand): Promise<void> {
    const product: Product = {
      image: command.image,
      cost: command.cost,
      description: command.description,
    };

    await this.productPersistencePort.persistProduct(product);
  }
}
