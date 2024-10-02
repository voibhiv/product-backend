import { SaveProductShop } from 'src/product-shop/application/ports/in/save-product-shop.command';

export class SaveProductCommand {
  constructor(
    readonly description: string,
    readonly shops: SaveProductShop[],
    readonly cost?: number,
    readonly image?: string,
  ) {}
}
