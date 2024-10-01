import { Provider } from '@nestjs/common';
import { SaveProductUseCase } from '../ports/in/save-product.use-case';
import { SaveProductService } from './save-product.service';
import { ProductMapper } from 'src/product/adapter/out/product.mapper';

export const ServicesOut: Provider[] = [
  {
    provide: SaveProductUseCase,
    useClass: SaveProductService,
  },
  ProductMapper,
];
