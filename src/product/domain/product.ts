import { SaveProductShopCommand } from 'src/product-shop/application/ports/in/product-shop.command';

export class Product {
  id?: number;
  description: string;
  cost?: number;
  image?: Buffer;
  shops: SaveProductShopCommand[];
}
