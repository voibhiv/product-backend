import { Provider } from '@nestjs/common';
import { SaveProductUseCase } from '../ports/in/save-product.use-case';
import { SaveProductService } from './save-product.service';

export const Services: Provider[] = [
  {
    provide: SaveProductUseCase,
    useClass: SaveProductService,
  },
];
