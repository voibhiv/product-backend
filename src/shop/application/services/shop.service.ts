import { Injectable } from '@nestjs/common';
import { ShopUseCase } from '../ports/in/shop.use-case';
import { ShopListPort } from '../ports/out/shop-list.port';

@Injectable()
export class ShopService implements ShopUseCase {
  constructor(private shopListPort: ShopListPort) {}

  async list() {
    return this.shopListPort.execute();
  }
}
