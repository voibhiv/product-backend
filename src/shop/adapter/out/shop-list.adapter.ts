import { Injectable } from '@nestjs/common';
import { ShopListPort } from 'src/shop/application/ports/out/shop-list.port';

@Injectable()
export class ShopListAdapter implements ShopListPort {
  async execute(): Promise<any> {
    return 'algo';
  }
}
