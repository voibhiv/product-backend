import { Product } from 'src/product/domain/product';

export abstract class ProductPersistencePort {
  abstract persistProduct(product: Product): Promise<void>;
}
