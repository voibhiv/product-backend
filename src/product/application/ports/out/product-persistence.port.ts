import { Product } from 'src/product/domain/product';

export abstract class ProductPersistencePort {
  abstract execute(product: Product): Promise<Product>;
  abstract validateName(name: string): Promise<boolean>;
}
