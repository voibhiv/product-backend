import { SaveProductCommand } from "../in/save-product.command";

export abstract class ProductUpdatePort {
  abstract execute(command: SaveProductCommand, id: number): Promise<any>;
}