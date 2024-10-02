import { SaveProductShop } from 'src/product-shop/application/ports/in/save-product-shop.command';
import { Shop } from 'src/shop/domain/shop';

export class Product {
  description: string;
  cost?: number;
  image?: string;
  shops: SaveProductShop[];
}
