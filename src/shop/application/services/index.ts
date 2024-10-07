import { Provider } from '@nestjs/common';
import { ShopUseCase } from '../ports/in/shop.use-case';
import { ShopService } from './shop.service';

export const Services: Provider[] = [
  {
    provide: ShopUseCase,
    useClass: ShopService,
  },
];
