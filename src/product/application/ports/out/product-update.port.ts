import { Product } from "src/product/domain/product";
import { SaveProductCommand } from "../in/save-product.command";

export abstract class ProductUpdatePort {
  abstract execute(command: SaveProductCommand, id: number): Promise<Product>;
}