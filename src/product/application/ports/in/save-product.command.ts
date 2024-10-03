import { SaveProductShopCommand } from 'src/product-shop/application/ports/in/product-shop.command';

export class SaveProductCommand {
  constructor(
    readonly description: string,
    readonly shops: SaveProductShopCommand[],
    readonly cost?: number,
    readonly image?: Buffer,
  ) {}
}
