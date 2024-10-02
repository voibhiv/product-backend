import { Provider } from '@nestjs/common';
import { ProductPersistencePort } from 'src/product/application/ports/out/product-persistence.adapter';
import { ProductPersistenceAdapter } from './product-persistence.adapter';
import { ProductMapper } from './product.mapper';

export const ServicesOut: Provider[] = [
  {
    provide: ProductPersistencePort,
    useClass: ProductPersistenceAdapter,
  },
  ProductMapper,
];
