import { SaveProductShopCommand } from 'src/product-shop/application/ports/in/product-shop.command';
import { Shop } from 'src/shop/domain/shop';

export class Product {
  description: string;
  cost?: number;
  image?: string;
  shops: SaveProductShopCommand[];
}
