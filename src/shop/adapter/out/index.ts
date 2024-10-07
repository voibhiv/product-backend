import { Provider } from '@nestjs/common';
import { ShopListAdapter } from './shop-list.adapter';
import { ShopListPort } from 'src/shop/application/ports/out/shop-list.port';

export const ServicesOut: Provider[] = [
  {
    provide: ShopListPort,
    useClass: ShopListAdapter,
  },
];
