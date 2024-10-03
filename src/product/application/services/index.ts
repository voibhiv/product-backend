import { Provider } from '@nestjs/common';
import { ProductUseCase } from '../ports/in/product.use-case';
import { ProductService } from './product.service';

export const Services: Provider[] = [
  {
    provide: ProductUseCase,
    useClass: ProductService,
  },
];
