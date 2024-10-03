import { SaveProductCommand } from './save-product.command';

export abstract class ProductUseCase {
  abstract saveProduct(command: SaveProductCommand): Promise<void>;
}
