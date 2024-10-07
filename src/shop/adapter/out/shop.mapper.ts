import { Injectable } from '@nestjs/common';
import { ShopEntity } from './shop.entity';
import { Shop } from 'src/shop/domain/shop';

@Injectable()
export class ShopMapper {
  toResponse(shop: ShopEntity): Shop {
    return {
      ...shop,
    };
  }
}
