import { SaveProductCommand } from './save-product.command';

export abstract class SaveProductUseCase {
  abstract saveProduct(command: SaveProductCommand): Promise<void>;
}
