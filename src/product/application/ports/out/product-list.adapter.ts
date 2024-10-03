import { GenericFilter } from "src/core/generics/generic-filter";
import { ListProductRequest } from "src/product/adapter/in/requests/list-product.request";
import { Product } from "src/product/domain/product";

export abstract class ProductListPort {
  abstract execute(filter: GenericFilter & ListProductRequest): Promise<Product[]>;
}