import { Shop } from 'src/shop/domain/shop';

export abstract class ShopListPort {
  abstract execute(): Promise<Shop[]>;
}
