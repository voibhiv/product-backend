import { Product } from 'src/product/domain/product';
import { SaveProductCommand } from './save-product.command';
import { GenericFilter } from 'src/core/generics/generic-filter';
import { ListProductRequest } from 'src/product/adapter/in/requests/list-product.request';

export abstract class ProductUseCase {
  abstract saveProduct(command: SaveProductCommand): Promise<Product>;
  abstract list(filter: GenericFilter & ListProductRequest): Promise<Product[]>;
}
